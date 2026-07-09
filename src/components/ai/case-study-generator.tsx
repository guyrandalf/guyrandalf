"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CaseStudy } from "@/lib/ai/case-study";
import { cn } from "@/lib/utils";

const PROVIDER_OPTIONS = [
  { id: "xai", label: "Grok · xAI" },
  { id: "google", label: "Gemini · Google" },
] as const;

export default function CaseStudyGenerator() {
  const [input, setInput] = useState("");
  const [provider, setProvider] = useState<string>("xai");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CaseStudy | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    if (input.trim().length < 8 || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/case-study", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: input.trim(), provider }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error ?? "Something went wrong.");
      else setResult(data.caseStudy as CaseStudy);
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 pt-6">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={4}
            placeholder="Describe a system, or paste a repo URL. e.g. 'A Next.js app that lets users chat with their PDFs using RAG and Postgres.'"
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          <div className="flex items-center justify-between gap-2">
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
            <Button
              onClick={generate}
              disabled={loading || input.trim().length < 8}
              className="bg-violet-cta text-white hover:opacity-95"
            >
              {loading ? "Analyzing…" : "Generate breakdown"}
            </Button>
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </CardContent>
      </Card>

      {result ? (
        <Card>
          <CardHeader>
            <CardTitle>{result.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{result.overview}</p>
          </CardHeader>
          <CardContent className="space-y-6 text-sm">
            <Section title="Components">
              <ul className="space-y-1.5">
                {result.components.map((c, i) => (
                  <li key={i}>
                    <span className="font-medium">{c.name}</span>
                    <span className="text-muted-foreground">
                      {": "}
                      {c.responsibility}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Data flow">
              <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
                {result.dataFlow.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </Section>
            <Section title="Trade-offs">
              <ul className="space-y-1.5">
                {result.tradeoffs.map((t, i) => (
                  <li key={i}>
                    <span className="font-medium">{t.decision}</span>
                    <span className="text-muted-foreground">
                      {": "}
                      {t.rationale}
                    </span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="Risks">
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                {result.risks.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </Section>
            <Section title="Likely stack">
              <div className="flex flex-wrap gap-2">
                {result.stack.map((s) => (
                  <Badge key={s} variant="outline">
                    {s}
                  </Badge>
                ))}
              </div>
            </Section>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}
