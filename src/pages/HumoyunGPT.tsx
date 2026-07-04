import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { ArrowLeft, ExternalLink, MessageCircle, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/profile.jpg";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
  pending?: boolean;
};

const prompts = [
  "How did you get to HKUST?",
  "What is Naseeb Edu?",
  "Give me advice for scholarships.",
  "Why is Hong Kong special for you?",
  "Grant olish uchun nimadan boshlay?",
];

const publicLinks = [
  { label: "Telegram", href: "https://t.me/humoyun_com" },
  { label: "Naseeb Edu", href: "https://t.me/naseeb_edu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/khumoyun-nasipkulov" },
];

const cleanText = (value: string) =>
  value
    .replace(/\s*\[(?:\d+(?:\s*,\s*\d+)*)\]/g, "")
    .replace(/\s*\[(?:source|post|context)\s+\d+\]/gi, "");

const linkify = (value: string) => {
  const cleaned = cleanText(value);
  const parts = cleaned.split(/(https?:\/\/[^\s<),]+|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})/gi);

  return parts.map((part, index) => {
    if (/^https?:\/\//i.test(part)) {
      const trailing = part.match(/[.,!?;:]+$/);
      const href = trailing ? part.slice(0, -trailing[0].length) : part;
      const label = href.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

      return (
        <span key={`${part}-${index}`}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-accent underline underline-offset-4"
          >
            {label}
          </a>
          {trailing?.[0] ?? ""}
        </span>
      );
    }

    if (/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(part)) {
      return (
        <a key={`${part}-${index}`} href={`mailto:${part}`} className="font-medium text-accent underline underline-offset-4">
          {part}
        </a>
      );
    }

    return <span key={`${part}-${index}`}>{part}</span>;
  });
};

const HumoyunGPT = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Assalomu alaykum. Ask me about HKUST, scholarships, Hong Kong, Naseeb Edu, or how to start preparing for study abroad.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = async (event?: FormEvent) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    const nextMessages: ChatMessage[] = [
      ...messages.filter((message) => message.content.trim()),
      { role: "user", content: text },
      { role: "assistant", content: "", pending: true },
    ];

    setMessages(nextMessages);
    setInput("");
    setBusy(true);

    try {
      const response = await fetch("/api/humoyungpt", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((message) => !message.pending)
            .map((message) => ({ role: message.role, content: message.content })),
        }),
      });

      if (!response.ok || !response.body) {
        let error = "Something glitched on my side. Try again in a second.";
        try {
          const data = await response.json();
          if (data?.error) error = data.error;
        } catch {
          // Keep the friendly fallback.
        }
        setMessages((current) => current.map((message, index) => (
          index === current.length - 1 ? { role: "assistant", content: error } : message
        )));
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        setMessages((current) => current.map((message, index) => (
          index === current.length - 1
            ? { ...message, content: message.content + chunk, pending: true }
            : message
        )));
      }
    } catch {
      setMessages((current) => current.map((message, index) => (
        index === current.length - 1
          ? { role: "assistant", content: "The chat endpoint is unreachable right now." }
          : message
      )));
    } finally {
      setBusy(false);
      setMessages((current) => current.map((message, index) => (
        index === current.length - 1 ? { ...message, pending: false } : message
      )));
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void submit();
    }
  };

  const usePrompt = (prompt: string) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <img src={heroBg} alt="" className="h-full w-full object-cover opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/95 to-background" />
      </div>

      <header className="sticky top-0 z-40 border-b border-divider bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">
          <Button variant="ghost" className="gap-2" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              Khumoyun Nasipkulov
            </Link>
          </Button>

          <div className="hidden items-center gap-3 md:flex">
            {publicLinks.map((link) => (
              <Button key={link.href} variant="ghost" size="sm" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-6 px-6 py-6 md:px-12 lg:grid-cols-[360px_minmax(0,1fr)]">
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden border-divider bg-card/80 shadow-lg backdrop-blur">
            <div className="relative aspect-[4/3]">
              <img src={profileImg} alt="Khumoyun Nasipkulov" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-primary-foreground">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Public-context AI
                </div>
                <h1 className="text-3xl font-bold leading-tight">HumoyunGPT</h1>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <p className="text-sm leading-6 text-muted-foreground">
                An AI version of Humoyun grounded in public portfolio details, Telegram posts, education work, and public media context.
              </p>
              <div className="flex items-start gap-3 rounded-md border border-divider bg-muted/50 p-3 text-sm text-muted-foreground">
                <MessageCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>It answers as an AI version and stays honest when public context is not enough.</span>
              </div>
            </div>
          </Card>

          <Card className="border-divider bg-card/80 p-4 backdrop-blur">
            <div className="mb-3 text-sm font-semibold text-foreground">Try asking</div>
            <div className="grid gap-2">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => usePrompt(prompt)}
                  className="rounded-md border border-input bg-background px-3 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-accent hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </Card>
        </aside>

        <section className="flex min-h-[calc(100vh-7rem)] flex-col overflow-hidden rounded-lg border border-divider bg-card/80 shadow-lg backdrop-blur">
          <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-4 md:p-6">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[88%] md:max-w-[74%] ${message.role === "user" ? "text-right" : "text-left"}`}>
                  <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-subtle">
                    {message.role === "user" ? "You" : "HumoyunGPT"}
                  </div>
                  <div
                    className={`whitespace-pre-wrap rounded-lg px-4 py-3 text-sm leading-6 md:text-base ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-divider bg-background text-foreground"
                    }`}
                  >
                    {linkify(message.content)}
                    {message.pending && <span className="ml-1 inline-block h-4 w-2 animate-pulse bg-accent align-text-bottom" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="flex items-end gap-3 border-t border-divider bg-background/90 p-4">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Humoyun something..."
              className="max-h-40 min-h-12 resize-none bg-card"
              disabled={busy}
            />
            <Button type="submit" size="icon" className="h-12 w-12 flex-shrink-0" disabled={busy || !input.trim()}>
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default HumoyunGPT;
