# HumoyunGPT

HumoyunGPT is a small Netlify app that lets people chat with an AI version of Khumoyun Nasipkulov, grounded in public context from his portfolio, Telegram channel, public education posts, and public media mentions.

Live: https://humoyungpt.netlify.app

The app intentionally keeps the API key out of source control. Set `GEMINI_API_KEY` in Netlify or in a local `.env` file.

## Run locally

```bash
GEMINI_API_KEY=your_key netlify dev
```

Then open the printed localhost URL.

## Refresh the RAG corpus

The deployed function imports `netlify/functions/humoyun-corpus.json`, which is built from public seed facts, Telegram posts, Telegram video-note summaries, YouTube metadata/captions, and Gemini embeddings.

```bash
export GEMINI_API_KEY=your_key
export HUMOYUN_CONTEXT_DIR=/absolute/path/to/humoyun_context
npm run fetch:youtube
npm run summarize:telegram-videos
npm run summarize:youtube
npm run build:corpus
```

Raw YouTube captions/audio are cached under `data/.cache/` and are intentionally ignored by git. Telegram MP4s are also kept outside the repo. The committed data files are compact public summaries/manifests plus the embedded corpus.

## Deploy

```bash
netlify deploy --prod
```

## Data notes

Sources used for the first corpus:

- https://www.humoyun.com/
- https://t.me/s/humoyun_com
- https://telemetr.io/en/channels/1577506188-humoyundotcom
- https://www.youtube.com/watch?v=b1-1g-w-v_A
- https://t.me/s/elyurtumidifoundation?before=11418
- https://portal.bloombergforeducation.com/certificates/JJnawfhBbKt7sQMKQuosSjpj

The Telegram archive included many short video-note URLs. A local Whisper pass was too noisy to trust, so the build uses Gemini multimodal summaries for downloaded public Telegram MP4s, YouTube captions/metadata where available, profile data, and public Telegram text. If API quota blocks a video summarization run, rerun the relevant script later; errored summaries are skipped by the corpus builder.
