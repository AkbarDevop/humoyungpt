#!/usr/bin/env node
import { mkdirSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = resolve(repoRoot, "data/source-videos.json");
const cacheDir = resolve(process.env.YOUTUBE_CACHE_DIR || join(repoRoot, "data/.cache/youtube"));
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

mkdirSync(cacheDir, { recursive: true });

for (const video of manifest.videos || []) {
  const outDir = join(cacheDir, video.id);
  mkdirSync(outDir, { recursive: true });
  console.log(`\n==> ${video.id} ${video.url}`);
  const args = [
    "--no-playlist",
    "--skip-download",
    "--write-info-json",
    "--write-sub",
    "--write-auto-subs",
    "--sub-langs",
    "en.*,en,uz.*,uz,ru.*,ru",
    "--sub-format",
    "vtt",
    "--convert-subs",
    "vtt",
    "--output",
    join(outDir, "%(id)s.%(ext)s"),
    video.url,
  ];
  const result = spawnSync("yt-dlp", args, { stdio: "inherit" });
  if (result.status !== 0) {
    console.warn(`yt-dlp failed for ${video.id}; continuing so the builder can use any cached data.`);
  }
}
