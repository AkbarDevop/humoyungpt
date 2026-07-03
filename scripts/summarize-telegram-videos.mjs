#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contextDir = resolve(process.env.HUMOYUN_CONTEXT_DIR || join(repoRoot, "../humoyun_context"));
const videoDir = resolve(contextDir, "videos");
const messagesPath = resolve(contextDir, "messages.json");
const outPath = resolve(process.env.TELEGRAM_VIDEO_SUMMARIES || join(repoRoot, "data/telegram-video-summaries.json"));
const apiKey = process.env.GEMINI_API_KEY;
const force = process.argv.includes("--force");
const limitArg = process.argv.find((arg) => arg.startsWith("--limit="));
const limit = limitArg ? Number(limitArg.split("=")[1]) : Infinity;
const maxInlineBytes = Number(process.env.MAX_INLINE_VIDEO_BYTES || 18 * 1024 * 1024);

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is required to summarize Telegram videos.");
}
if (!existsSync(videoDir)) {
  throw new Error(`Telegram video directory not found: ${videoDir}`);
}

const messages = existsSync(messagesPath)
  ? new Map(JSON.parse(readFileSync(messagesPath, "utf8")).map((msg) => [String(msg.post_id), msg]))
  : new Map();

const existing = existsSync(outPath) && !force
  ? JSON.parse(readFileSync(outPath, "utf8"))
  : [];
const byId = new Map(existing.map((item) => [String(item.id), item]));

const files = readdirSync(videoDir)
  .filter((name) => name.endsWith(".mp4"))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }))
  .slice(0, limit);

mkdirSync(dirname(outPath), { recursive: true });

for (const fileName of files) {
  const id = fileName.replace(/\.mp4$/, "");
  if (byId.has(id) && !byId.get(id).error && !force) {
    console.log(`skip ${id}, already summarized`);
    continue;
  }

  const filePath = join(videoDir, fileName);
  const size = statSync(filePath).size;
  const msg = messages.get(id) || {};
  if (size > maxInlineBytes) {
    byId.set(id, {
      id,
      source: "Telegram video note",
      url: msg.url || `https://t.me/humoyun_com/${id}`,
      date: msg.datetime || null,
      duration: msg.duration || null,
      caption: cleanText(msg.text || ""),
      skipped: true,
      reason: `file is ${size} bytes, above MAX_INLINE_VIDEO_BYTES`,
    });
    save();
    continue;
  }

  console.log(`summarizing Telegram video ${id} (${Math.round(size / 1024 / 1024)} MB)`);
  const video = readFileSync(filePath).toString("base64");
  const prompt = [
    "This is a public Telegram video note from Khumoyun/Humoyun Nasipkulov's public channel.",
    "Transcribe spoken Uzbek as accurately as possible in Latin Uzbek. Preserve meaning over perfect punctuation.",
    "If the audio is unclear or mostly music/noise, say that instead of guessing.",
    "Also produce a short English factual summary and 3-7 topic tags.",
    "Return JSON only with keys transcript_uz, summary_en, topics, confidence.",
    "",
    `Telegram URL: ${msg.url || `https://t.me/humoyun_com/${id}`}`,
    `Date: ${msg.datetime || "unknown"}`,
    `Public caption/context: ${cleanText(msg.text || "") || "(none)"}`,
  ].join("\n");

  try {
    const result = await generateJson([
      { text: prompt },
      { inlineData: { mimeType: "video/mp4", data: video } },
    ]);
    byId.set(id, {
      id,
      source: "Telegram video note",
      url: msg.url || `https://t.me/humoyun_com/${id}`,
      date: msg.datetime || null,
      duration: msg.duration || null,
      caption: cleanText(msg.text || ""),
      transcriptUz: cleanText(result.transcript_uz || ""),
      summaryEn: cleanText(result.summary_en || ""),
      topics: Array.isArray(result.topics) ? result.topics.map((topic) => cleanText(topic)).filter(Boolean) : [],
      confidence: cleanText(result.confidence || "unknown"),
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    byId.set(id, {
      id,
      source: "Telegram video note",
      url: msg.url || `https://t.me/humoyun_com/${id}`,
      date: msg.datetime || null,
      duration: msg.duration || null,
      caption: cleanText(msg.text || ""),
      error: error.message,
      generatedAt: new Date().toISOString(),
    });
  }
  save();
}

function save() {
  const output = [...byId.values()].sort((a, b) => String(a.id).localeCompare(String(b.id), "en", { numeric: true }));
  writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
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

function cleanText(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .replace(/\u00a0/g, " ")
    .trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
