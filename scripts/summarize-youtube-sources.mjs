#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(repoRoot, "data/source-videos.json");
const cacheDir = resolve(process.env.YOUTUBE_CACHE_DIR || join(repoRoot, "data/.cache/youtube"));
const outPath = resolve(process.env.YOUTUBE_VIDEO_SUMMARIES || join(repoRoot, "data/youtube-video-summaries.json"));
const apiKey = process.env.GEMINI_API_KEY;
const force = process.argv.includes("--force");
const withAudio = process.argv.includes("--with-audio");
const maxInlineAudioBytes = Number(process.env.MAX_INLINE_AUDIO_BYTES || 18 * 1024 * 1024);

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is required to summarize YouTube sources.");
}

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const existing = existsSync(outPath) && !force
  ? JSON.parse(readFileSync(outPath, "utf8"))
  : [];
const byId = new Map(existing.map((item) => [String(item.id), item]));
mkdirSync(dirname(outPath), { recursive: true });

for (const source of manifest.videos || []) {
  if (byId.has(source.id) && !byId.get(source.id).error && !force) {
    console.log(`skip ${source.id}, already summarized`);
    continue;
  }

  const dir = join(cacheDir, source.id);
  const info = readInfo(dir);
  const caption = readBestCaption(dir);
  console.log(`summarizing YouTube ${source.id}: ${info?.title || source.titleHint || source.url}`);

  let transcriptSource = caption?.name ? `captions:${caption.name}` : "metadata_only";
  let mediaPart = null;
  let transcriptText = caption?.text || "";

  if (!transcriptText && withAudio && shouldUseAudio(source, info)) {
    const audioPath = ensureAudio(source, dir);
    if (audioPath && statSync(audioPath).size <= maxInlineAudioBytes) {
      mediaPart = {
        inlineData: {
          mimeType: mimeFor(audioPath),
          data: readFileSync(audioPath).toString("base64"),
        },
      };
      transcriptSource = `audio:${audioPath.split("/").pop()}`;
    }
  }

  const telegramContext = telegramContextFor(source.telegramPosts || []);
  const prompt = [
    "Summarize this public YouTube source for a HumoyunGPT retrieval corpus.",
    "Be factual. Distinguish whether the video is directly about Humoyun/Khumoyun or only shared/recommended by him.",
    "If transcript/caption/audio is absent, summarize only the public metadata and say confidence is low.",
    "Return JSON only with keys summary_en, summary_uz, key_points, humoyun_signals, language, confidence.",
    "",
    `Video URL: ${source.url}`,
    `Relation: ${source.relation}`,
    `Title hint: ${source.titleHint || ""}`,
    `Title: ${info?.title || ""}`,
    `Channel: ${info?.channel || info?.uploader || ""}`,
    `Duration seconds: ${info?.duration || ""}`,
    `Description: ${cleanText(info?.description || "").slice(0, 2500)}`,
    `Telegram context: ${telegramContext || "(none)"}`,
    `Transcript source: ${transcriptSource}`,
    transcriptText ? `Caption/transcript excerpt:\n${transcriptText.slice(0, 22000)}` : "",
  ].filter(Boolean).join("\n");

  try {
    const parts = mediaPart ? [{ text: prompt }, mediaPart] : [{ text: prompt }];
    const result = await generateJson(parts);
    byId.set(source.id, {
      id: source.id,
      source: "YouTube video",
      url: source.url,
      relation: source.relation,
      telegramPosts: source.telegramPosts || [],
      title: cleanText(info?.title || source.titleHint || ""),
      channel: cleanText(info?.channel || info?.uploader || ""),
      duration: info?.duration || null,
      transcriptSource,
      language: cleanText(result.language || ""),
      summaryEn: cleanText(result.summary_en || ""),
      summaryUz: cleanText(result.summary_uz || ""),
      keyPoints: normalizeList(result.key_points),
      humoyunSignals: normalizeList(result.humoyun_signals),
      confidence: cleanText(result.confidence || "unknown"),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    byId.set(source.id, {
      id: source.id,
      source: "YouTube video",
      url: source.url,
      relation: source.relation,
      telegramPosts: source.telegramPosts || [],
      title: cleanText(info?.title || source.titleHint || ""),
      channel: cleanText(info?.channel || info?.uploader || ""),
      duration: info?.duration || null,
      transcriptSource,
      error: error.message,
      generatedAt: new Date().toISOString(),
    });
  }
  save();
}

function save() {
  const output = [...byId.values()].sort((a, b) => a.id.localeCompare(b.id));
  writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
}

function readInfo(dir) {
  if (!existsSync(dir)) return null;
  const file = readdirSync(dir).find((name) => name.endsWith(".info.json"));
  return file ? JSON.parse(readFileSync(join(dir, file), "utf8")) : null;
}

function readBestCaption(dir) {
  if (!existsSync(dir)) return null;
  const files = readdirSync(dir).filter((name) => name.endsWith(".vtt"));
  const preference = ["en-orig", "en.", ".en", "uz", "ru"];
  const sorted = files.sort((a, b) => rank(a) - rank(b));
  for (const name of sorted) {
    const text = vttToText(readFileSync(join(dir, name), "utf8"));
    if (text.length > 200) return { name, text };
  }
  return null;

  function rank(name) {
    const idx = preference.findIndex((needle) => name.includes(needle));
    return idx === -1 ? 99 : idx;
  }
}

function vttToText(vtt) {
  const seen = new Set();
  const lines = [];
  for (const line of vtt.split(/\r?\n/)) {
    const trimmed = line
      .replace(/<[^>]+>/g, "")
      .replace(/&amp;/g, "&")
      .replace(/&nbsp;/g, " ")
      .trim();
    if (!trimmed || trimmed === "WEBVTT" || trimmed.startsWith("Kind:") || trimmed.startsWith("Language:")) continue;
    if (/^\d+$/.test(trimmed)) continue;
    if (trimmed.includes("-->")) continue;
    if (seen.has(trimmed)) continue;
    seen.add(trimmed);
    lines.push(trimmed);
  }
  return cleanText(lines.join(" "));
}

function shouldUseAudio(source, info) {
  if (source.relation === "direct_about_humoyun") return true;
  return Number(info?.duration || 0) > 0 && Number(info?.duration || 0) <= 900;
}

function ensureAudio(source, dir) {
  mkdirSync(dir, { recursive: true });
  const existing = readdirSync(dir)
    .map((name) => join(dir, name))
    .find((path) => [".mp3", ".m4a", ".webm", ".opus"].includes(extname(path)));
  if (existing) return existing;

  const result = spawnSync("yt-dlp", [
    "--no-playlist",
    "-f",
    "ba/bestaudio/best",
    "-x",
    "--audio-format",
    "mp3",
    "--audio-quality",
    "7",
    "--output",
    join(dir, "%(id)s.%(ext)s"),
    source.url,
  ], { stdio: "inherit" });
  if (result.status !== 0) return null;
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .find((path) => [".mp3", ".m4a", ".webm", ".opus"].includes(extname(path))) || null;
}

function telegramContextFor(postIds) {
  const contextDir = process.env.HUMOYUN_CONTEXT_DIR;
  if (!contextDir || !postIds.length) return "";
  const messagesPath = join(contextDir, "messages.json");
  if (!existsSync(messagesPath)) return "";
  const messages = JSON.parse(readFileSync(messagesPath, "utf8"));
  return messages
    .filter((msg) => postIds.includes(Number(msg.post_id)))
    .map((msg) => `Post ${msg.post_id}: ${cleanText(msg.text || "").slice(0, 1200)}`)
    .join(" ");
}

async function generateJson(parts) {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [{ role: "user", parts }],
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      }),
    });
    const raw = await res.text();
    if (res.ok) {
      const text = JSON.parse(raw)?.candidates?.[0]?.content?.parts?.map((part) => part.text || "").join("") || "";
      return parseJsonText(text);
    }
    if (res.status === 429 && attempt < 4) {
      const retrySeconds = Number(raw.match(/retry in ([0-9.]+)s/i)?.[1] || 25);
      await sleep(Math.ceil(retrySeconds * 1000) + 1000);
      continue;
    }
    throw new Error(`Gemini ${res.status}: ${raw.slice(0, 500)}`);
  }
  throw new Error("Gemini request failed after retries.");
}

function parseJsonText(text) {
  const trimmed = text.trim().replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```$/i, "").trim();
  return JSON.parse(trimmed);
}

function normalizeList(value) {
  return Array.isArray(value) ? value.map((item) => cleanText(item)).filter(Boolean) : [];
}

function cleanText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function mimeFor(path) {
  if (path.endsWith(".mp3")) return "audio/mpeg";
  if (path.endsWith(".m4a")) return "audio/mp4";
  if (path.endsWith(".opus")) return "audio/ogg";
  return "audio/webm";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
