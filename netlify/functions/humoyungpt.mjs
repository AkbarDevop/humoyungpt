import CORPUS from "./humoyun-corpus.json" with { type: "json" };

const MODEL = "gemini-2.5-flash";
const MAX_HISTORY = 14;
const MAX_CHARS_PER_MSG = 1800;
const MAX_OUTPUT_TOKENS = 1100;
const TOP_K = 8;
const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 20;

const STOP = new Set([
  "the", "and", "for", "with", "that", "this", "from", "you", "are", "was", "were", "his", "her", "him",
  "about", "what", "when", "where", "why", "how", "into", "your", "have", "has", "had", "not", "but",
  "bir", "bilan", "uchun", "ham", "esa", "shu", "nima", "qanday", "agar", "lekin", "juda", "yoki",
  "siz", "men", "biz", "ular", "bo", "bu", "va", "of", "in", "to", "a", "is", "on", "at", "as"
]);

const SYSTEM_PROMPT = `you are humoyungpt, an ai version of khumoyun nasipkulov, also written humoyun nasipqulov in uzbek-language sources.

you speak as humoyun in first person when the visitor wants to talk to the persona. if asked directly whether you are the real humoyun, be honest: you are an ai version built from public context, and the real humoyun is reachable through his public links.

core identity:
- i am from uzbekistan and study mathematics and economics at hkust in hong kong.
- my public work is centered on education, mentorship, scholarships, admissions, math, economics, and building bridges between uzbek students and global universities.
- i founded naseeb edu and mentor students who want to study abroad, especially students aiming at top universities and scholarships.
- i care about faith, family, parents' dua, meaningful connections, disciplined intention, and making opportunity feel reachable for students who come from ordinary places.
- hong kong matters to me because it opened doors: scholarships, international finance, career options, and the chance to understand the greater bay area and mainland china.

voice:
- mirror the user's language. if they ask in uzbek, answer in natural uzbek latin. if they ask in english, answer in english.
- warm, direct, mentor-like, a little poetic, but not inflated.
- specific over generic. use real public details when relevant.
- the phrase "Sizga ham naseeb qilsin" is part of the public voice and can be used naturally in Uzbek answers, especially about scholarships or student wins.
- keep most answers short: one to four compact paragraphs. use bullets only when the user asks for steps, lists, or a plan.
- no corporate filler. avoid words like robust, leverage as a verb, delve, world-class, in today's world.

advice style:
- for study abroad: talk about scholarships, essays, standardized tests, consistent preparation, meaningful mentors, and choosing the right environment.
- for students: emphasize intention, hard work, family support, community, and starting earlier than feels comfortable.
- for careers: meaningful connections can open more doors than many cold applications, but preparation still matters.
- for engineering and innovation: curiosity must be built early. museums, machines, and hands-on exposure shape children.

privacy and accuracy:
- only use public information from the context. do not invent private details, phone numbers, home address, family specifics, exact finances, grades beyond public source text, or private relationships.
- public links are okay: humoyun.com, t.me/humoyun_com, t.me/naseeb_edu, linkedin.com/in/khumoyun-nasipkulov, and public email knasipkulov@connect.ust.hk.
- if you do not know, say you do not know from public context.`;

const CHUNKS = Array.isArray(CORPUS?.chunks) ? CORPUS.chunks : [];
const rate = new Map();

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9_@.]+/i)
    .map((w) => w.trim())
    .filter((w) => w.length > 2 && !STOP.has(w));
}

function retrieve(query) {
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];
  const q = new Map();
  for (const token of qTokens) q.set(token, (q.get(token) || 0) + 1);
  const scored = CHUNKS.map((chunk) => {
    const text = `${chunk.source || ""} ${chunk.text || ""}`;
    const tokens = tokenize(text);
    let score = 0;
    for (const token of tokens) {
      if (q.has(token)) score += q.get(token);
      for (const [needle] of q) {
        if (needle.length > 4 && token.includes(needle)) score += 0.35;
      }
    }
    const lowered = text.toLowerCase();
    for (const [needle] of q) {
      if (lowered.includes(needle)) score += 1.2;
    }
    return { ...chunk, score };
  })
    .filter((chunk) => chunk.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, TOP_K);
}

function limited(ip) {
  const now = Date.now();
  const current = rate.get(ip);
  if (!current || now > current.resetAt) {
    rate.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > RATE_MAX;
}

function toGeminiHistory(raw) {
  return raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content.slice(0, MAX_CHARS_PER_MSG) }],
    }));
}

function textFromSseEvent(evt) {
  const parts = evt?.candidates?.[0]?.content?.parts;
  if (!Array.isArray(parts)) return "";
  return parts.map((part) => (typeof part.text === "string" ? part.text : "")).join("");
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("method not allowed", { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "server not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const ip = req.headers.get("x-nf-client-connection-ip") ||
    req.headers.get("x-forwarded-for") ||
    "unknown";
  if (limited(ip)) {
    return new Response(JSON.stringify({ error: "slow down a second, too many messages" }), {
      status: 429,
      headers: { "content-type": "application/json" },
    });
  }

  let body = null;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const raw = Array.isArray(body?.messages) ? body.messages : null;
  const contents = raw ? toGeminiHistory(raw) : [];
  if (!contents.length || contents.at(-1).role !== "user") {
    return new Response(JSON.stringify({ error: "last message must be from the user" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const lastUser = contents.at(-1).parts[0].text;
  const notes = retrieve(lastUser);
  let systemText = SYSTEM_PROMPT;
  if (notes.length) {
    systemText += "\n\npublic context relevant to this question:\n" +
      notes.map((note, index) => {
        const where = note.url ? `${note.source}: ${note.url}` : note.source;
        return `[${index + 1}] ${where}\n${note.text}`;
      }).join("\n\n") +
      "\n\nuse this context naturally. do not say 'according to the context' unless the user asks for sources.";
  }

  let upstream;
  try {
    upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemText }] },
        contents,
        generationConfig: {
          maxOutputTokens: MAX_OUTPUT_TOKENS,
          temperature: 0.82,
        },
      }),
    });
  } catch {
    return new Response(JSON.stringify({ error: "upstream unreachable" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }

  if (!upstream.ok || !upstream.body) {
    const status = upstream.status === 429 ? 429 : 502;
    const error = upstream.status === 429
      ? "i am getting a lot of messages right now. try again in a minute."
      : "something glitched on my side. try again in a second.";
    await upstream.text().catch(() => "");
    return new Response(JSON.stringify({ error }), {
      status,
      headers: { "content-type": "application/json" },
    });
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = "";

  const stream = new ReadableStream({
    async pull(controller) {
      const { value, done } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() || "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const text = textFromSseEvent(JSON.parse(data));
          if (text) controller.enqueue(encoder.encode(text));
        } catch {
          // Ignore non-json keepalive chunks.
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
};

export const config = { path: "/api/humoyungpt" };
