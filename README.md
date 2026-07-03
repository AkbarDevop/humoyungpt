# HumoyunGPT

HumoyunGPT is a small Netlify app that lets people chat with an AI version of Khumoyun Nasipkulov, grounded in public context from his portfolio, Telegram channel, public education posts, and public media mentions.

Live: https://humoyungpt.netlify.app

The app intentionally keeps the API key out of source control. Set `GEMINI_API_KEY` in Netlify or in a local `.env` file.

## Run locally

```bash
GEMINI_API_KEY=your_key netlify dev
```

Then open the printed localhost URL.

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

The Telegram archive included many short video-note URLs. A small local Whisper pass was too noisy to trust, so this build uses reliable public text, captions, profile data, and media metadata instead of pretending to have clean video transcripts.
