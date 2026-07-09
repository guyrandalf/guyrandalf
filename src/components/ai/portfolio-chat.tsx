"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PROVIDER_OPTIONS = [
  { id: "xai", label: "Grok · xAI" },
  { id: "google", label: "Gemini · Google" },
] as const;

const SUGGESTIONS = [
  "What AI systems has he shipped?",
  "Tell me about the multi-agent project.",
  "How can I contact him?",
];

export default function PortfolioChat() {
  const [provider, setProvider] = useState<string>("xai");
  const providerRef = useRef(provider);
  providerRef.current = provider;

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ messages, id, body }) => ({
          body: { ...body, id, messages, provider: providerRef.current },
        }),
      }),
    [],
  );

  const { messages, sendMessage, status, error } = useChat({ transport });
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";

  function submit(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    sendMessage({ text: trimmed });
    setInput("");
  }

  return (
    <Card className="flex h-[34rem] flex-col overflow-hidden rounded-2xl shadow-sm">
      {/* Provider switcher */}
      <div className="flex items-center justify-between gap-2 border-b border-border/60 p-3">
        <span className="text-xs text-muted-foreground">Model</span>
        <div className="flex rounded-md border border-border p-0.5">
          {PROVIDER_OPTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setProvider(p.id)}
              className={cn(
                "rounded px-3 py-1 text-xs font-medium transition-colors",
                provider === p.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              Ask anything about Guy&apos;s work. This assistant answers only
              from the site&apos;s database, using live tool calls.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="rounded-full border border-border px-3 py-1 text-xs hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-1",
                message.role === "user" ? "items-end" : "items-start",
              )}
            >
              {message.parts.map((part, i) => {
                if (part.type === "text") {
                  return (
                    <div
                      key={i}
                      className={cn(
                        "max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground",
                      )}
                    >
                      {part.text}
                    </div>
                  );
                }
                if (part.type.startsWith("tool-")) {
                  const toolName = part.type.replace("tool-", "");
                  const state = (part as { state?: string }).state;
                  const done = state === "output-available";
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 rounded-full border border-border/60 bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          done
                            ? "bg-emerald-500"
                            : "animate-pulse bg-amber-500",
                        )}
                      />
                      {done ? "used" : "calling"} <code>{toolName}</code>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))
        )}
        {error ? (
          <p className="text-sm text-destructive">
            Something went wrong. Try again or switch the model.
          </p>
        ) : null}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="flex items-center gap-2 border-t border-border/60 p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a project, a skill, or how to reach him…"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        <Button
          type="submit"
          disabled={busy || !input.trim()}
          className="bg-violet-cta text-white hover:opacity-95"
        >
          {busy ? "…" : "Send"}
        </Button>
      </form>
    </Card>
  );
}
