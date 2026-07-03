#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = resolve(process.env.CORPUS_OUT || join(repoRoot, "netlify/functions/humoyun-corpus.json"));
const contextDir = resolve(process.env.HUMOYUN_CONTEXT_DIR || join(repoRoot, "../humoyun_context"));
const embedModel = process.env.GEMINI_EMBED_MODEL || "gemini-embedding-001";
const embedDim = Number(process.env.GEMINI_EMBED_DIM || 768);
const noEmbed = process.argv.includes("--no-embed");
const apiKey = process.env.GEMINI_API_KEY;

if (!noEmbed && !apiKey) {
  throw new Error("GEMINI_API_KEY is required to build embedded corpus. Use --no-embed for a lexical-only build.");
}

const docs = [];
addSeedCorpus();
addTelegramPosts();
addTelegramVideoSummaries();
addYoutubeCachedSources();
addYoutubeVideoSummaries();

const chunks = dedupe(chunkDocs(docs));
console.log(`prepared ${docs.length} documents -> ${chunks.length} chunks`);

if (!noEmbed) {
  await embedChunks(chunks);
}

const corpus = {
  built: new Date().toISOString(),
  embeddingModel: noEmbed ? null : embedModel,
  embeddingDim: noEmbed ? null : embedDim,
  sourceCounts: countBy(chunks, "kind"),
  chunks,
};

mkdirSync(dirname(outPath), { recursive: true });
const pretty = process.env.PRETTY_CORPUS === "1";
writeFileSync(outPath, `${JSON.stringify(corpus, null, pretty ? 2 : 0)}\n`);
console.log(`wrote ${outPath}`);

function addSeedCorpus() {
  const seedPath = join(repoRoot, "data/seed-corpus.json");
  const seed = JSON.parse(readFileSync(seedPath, "utf8"));
  for (const chunk of seed.chunks || []) {
    docs.push({
      kind: "seed_fact",
      source: chunk.source,
      url: chunk.url,
      text: chunk.text,
    });
  }
}

function addTelegramPosts() {
  const messagesPath = join(contextDir, "messages.json");
  if (!existsSync(messagesPath)) return;
  const messages = JSON.parse(readFileSync(messagesPath, "utf8"));
  const selected = messages
    .filter((msg) => isUsefulTelegramPost(msg))
    .sort((a, b) => String(b.datetime || "").localeCompare(String(a.datetime || "")))
    .slice(0, Number(process.env.MAX_TELEGRAM_POSTS || 140));

  for (const msg of selected) {
    docs.push({
      kind: "telegram_post",
      source: "Telegram post",
      url: msg.url || `https://t.me/humoyun_com/${msg.post_id}`,
      date: msg.datetime || null,
      text: [
        `Public Telegram post ${msg.post_id}${msg.datetime ? ` from ${msg.datetime}` : ""}.`,
        cleanText(msg.text || ""),
      ].join("\n"),
    });
  }
}

function addTelegramVideoSummaries() {
  const path = join(repoRoot, "data/telegram-video-summaries.json");
  if (!existsSync(path)) return;
  for (const item of JSON.parse(readFileSync(path, "utf8"))) {
    if (item.skipped || item.error) continue;
    const text = [
      `Public Telegram video note ${item.id}${item.date ? ` from ${item.date}` : ""}.`,
      item.caption ? `Post caption: ${item.caption}` : "",
      item.transcriptUz ? `Transcript in Uzbek Latin: ${item.transcriptUz}` : "",
      item.summaryEn ? `English summary: ${item.summaryEn}` : "",
      item.topics?.length ? `Topics: ${item.topics.join(", ")}` : "",
      item.confidence ? `Transcript confidence: ${item.confidence}` : "",
    ].filter(Boolean).join("\n");
    if (text.length > 120) {
      docs.push({
        kind: "telegram_video",
        source: "Telegram video note",
        url: item.url,
        date: item.date || null,
        text,
      });
    }
  }
}

function addYoutubeVideoSummaries() {
  const path = join(repoRoot, "data/youtube-video-summaries.json");
  if (!existsSync(path)) return;
  for (const item of JSON.parse(readFileSync(path, "utf8"))) {
    if (item.error) continue;
    const text = [
      `Public YouTube video: ${item.title || item.id}.`,
      `Relation to HumoyunGPT: ${item.relation || "unknown"}.`,
      item.channel ? `Channel: ${item.channel}.` : "",
      item.duration ? `Duration: ${item.duration} seconds.` : "",
      item.transcriptSource ? `Grounding source: ${item.transcriptSource}.` : "",
      item.summaryEn ? `English summary: ${item.summaryEn}` : "",
      item.summaryUz ? `Uzbek summary: ${item.summaryUz}` : "",
      item.keyPoints?.length ? `Key points: ${item.keyPoints.join(" ")}` : "",
      item.humoyunSignals?.length ? `Humoyun-specific signals: ${item.humoyunSignals.join(" ")}` : "",
      item.confidence ? `Summary confidence: ${item.confidence}` : "",
    ].filter(Boolean).join("\n");
    if (text.length > 120) {
      docs.push({
        kind: "youtube_video",
        source: "YouTube video",
        url: item.url,
        date: null,
        text,
      });
    }
  }
}

function addYoutubeCachedSources() {
  const manifestPath = join(repoRoot, "data/source-videos.json");
  const cacheDir = join(repoRoot, "data/.cache/youtube");
  if (!existsSync(manifestPath)) return;
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  for (const source of manifest.videos || []) {
    const dir = join(cacheDir, source.id);
    const info = readInfo(dir);
    const caption = readBestCaption(dir);
    const telegramContext = telegramContextFor(source.telegramPosts || []);
    const description = cleanText(info?.description || "");
    const metadataText = [
      `Public YouTube video ${source.id}.`,
      `Relation to HumoyunGPT: ${source.relation}.`,
      `URL: ${source.url}.`,
      `Title: ${info?.title || source.titleHint || ""}.`,
      info?.channel || info?.uploader ? `Channel: ${info.channel || info.uploader}.` : "",
      info?.duration ? `Duration: ${info.duration} seconds.` : "",
      source.discoveredFrom ? `Discovered from: ${source.discoveredFrom}.` : "",
      telegramContext ? `Telegram context: ${telegramContext}` : "",
      description ? `Public description: ${description.slice(0, 2500)}` : "",
    ].filter(Boolean).join("\n");

    if (metadataText.length > 80) {
      docs.push({
        kind: "youtube_metadata",
        source: "YouTube video metadata",
        url: source.url,
        text: metadataText,
      });
    }

    if (caption?.text) {
      docs.push({
        kind: "youtube_caption",
        source: `YouTube captions (${caption.name})`,
        url: source.url,
        text: [
          `Public YouTube caption transcript for ${info?.title || source.titleHint || source.id}.`,
          `Relation to HumoyunGPT: ${source.relation}.`,
          `Caption file: ${caption.name}.`,
          caption.text,
        ].join("\n"),
      });
    }
  }
}

function isUsefulTelegramPost(msg) {
  const text = cleanText(msg.text || "");
  if (text.length < 140) return false;
  if (/plastik|karta|reklama|ariza .*qabul/i.test(text) && text.length < 900) return false;
  const lower = text.toLowerCase();
  const keywords = [
    "humoyun", "khumoyun", "hkust", "hong kong", "gong kong", "mathemat", "matemat",
    "economics", "iqtisod", "naseeb", "scholarship", "stipend", "eyuf", "el-yurt",
    "grant", "admission", "personal statement", "essay", "sat", "ielts", "university",
    "top universitet", "chet el", "o'qish", "o‘qish", "musofir", "ota", "ona", "dua",
    "ramazon", "shukr", "niyat", "intention", "schengen", "muhandis", "disney", "aops",
    "maec", "intern", "interview", "speakup", "ai", "mentor", "maktab", "olimpiada",
  ];
  return text.length >= 650 || keywords.some((keyword) => lower.includes(keyword));
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
    const index = preference.findIndex((needle) => name.includes(needle));
    return index === -1 ? 99 : index;
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

function telegramContextFor(postIds) {
  if (!postIds.length) return "";
  const messagesPath = join(contextDir, "messages.json");
  if (!existsSync(messagesPath)) return "";
  const messages = JSON.parse(readFileSync(messagesPath, "utf8"));
  return messages
    .filter((msg) => postIds.includes(Number(msg.post_id)))
    .map((msg) => `Post ${msg.post_id}: ${cleanText(msg.text || "").slice(0, 1200)}`)
    .join(" ");
}

function chunkDocs(inputDocs) {
  const output = [];
  for (const doc of inputDocs) {
    const text = cleanText(doc.text);
    if (!text) continue;
    const pieces = chunkText(text, 1150, 140);
    pieces.forEach((piece, index) => {
      output.push({
        id: `${slug(doc.kind)}-${output.length + 1}`,
        kind: doc.kind,
        source: doc.source,
        url: doc.url || null,
        date: doc.date || null,
        part: pieces.length > 1 ? index + 1 : null,
        text: piece,
      });
    });
  }
  return output;
}

function chunkText(text, maxChars, overlapChars) {
  if (text.length <= maxChars) return [text];
  const chunks = [];
  let start = 0;
  while (start < text.length) {
    let end = Math.min(text.length, start + maxChars);
    if (end < text.length) {
      const breakAt = Math.max(text.lastIndexOf(". ", end), text.lastIndexOf("\n", end), text.lastIndexOf(" ", end));
      if (breakAt > start + maxChars * 0.55) end = breakAt + 1;
    }
    chunks.push(text.slice(start, end).trim());
    start = Math.max(end - overlapChars, end);
  }
  return chunks.filter(Boolean);
}

function dedupe(inputChunks) {
  const seen = new Set();
  const output = [];
  for (const chunk of inputChunks) {
    const key = cleanText(chunk.text).toLowerCase().replace(/[^a-z0-9а-яёёўғқҳ]+/gi, " ").slice(0, 500);
    if (seen.has(key)) continue;
    seen.add(key);
    output.push({ ...chunk, id: `${slug(chunk.kind)}-${output.length + 1}` });
  }
  return output;
}

async function embedChunks(inputChunks) {
  const batchSize = Number(process.env.EMBED_BATCH_SIZE || 32);
  for (let i = 0; i < inputChunks.length; i += batchSize) {
    const batch = inputChunks.slice(i, i + batchSize);
    console.log(`embedding ${i + 1}-${i + batch.length}/${inputChunks.length}`);
    const embeddings = await embedBatch(batch.map((chunk) => chunk.text));
    embeddings.forEach((values, index) => {
      batch[index].embedding = values.map((value) => Number(value.toFixed(6)));
    });
  }
}

async function embedBatch(texts) {
  const body = {
    requests: texts.map((text) => ({
      model: `models/${embedModel}`,
      content: { parts: [{ text }] },
      taskType: "RETRIEVAL_DOCUMENT",
      outputDimensionality: embedDim,
    })),
  };
  for (let attempt = 1; attempt <= 6; attempt += 1) {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${embedModel}:batchEmbedContents`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify(body),
    });
    const raw = await res.text();
    if (!res.ok) {
      if (res.status === 429 && attempt < 6) {
        const retrySeconds = Number(raw.match(/retry in ([0-9.]+)s/i)?.[1] || 55);
        console.warn(`embedding quota pause: waiting ${Math.ceil(retrySeconds)}s`);
        await sleep(Math.ceil(retrySeconds * 1000) + 1000);
        continue;
      }
      throw new Error(`Gemini embeddings ${res.status}: ${raw.slice(0, 800)}`);
    }
    const data = JSON.parse(raw);
    const embeddings = data.embeddings?.map((embedding) => embedding.values);
    if (!Array.isArray(embeddings) || embeddings.length !== texts.length) {
      throw new Error(`Unexpected embedding response: ${raw.slice(0, 800)}`);
    }
    for (const values of embeddings) {
      if (!Array.isArray(values) || values.length !== embedDim) {
        throw new Error(`Expected ${embedDim} dimensions, got ${values?.length || 0}`);
      }
    }
    return embeddings;
  }
  throw new Error("Gemini embeddings failed after retries.");
}

function countBy(items, key) {
  return items.reduce((acc, item) => {
    acc[item[key] || "unknown"] = (acc[item[key] || "unknown"] || 0) + 1;
    return acc;
  }, {});
}

function cleanText(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function slug(value) {
  return String(value || "chunk").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "chunk";
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
