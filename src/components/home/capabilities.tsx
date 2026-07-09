import Link from "next/link";
import {
  ArrowUpRight,
  MessageSquare,
  FileCode2,
  Shuffle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { MotionCard } from "./motion-card";
import { SectionHeader } from "./section-header";
import { Explainer } from "@/components/explain/explainer";

interface Capability {
  icon: LucideIcon;
  title: string;
  body: string;
  href?: string;
  cta?: string;
  plain: string;
  tech: string;
}

const CAPS: Capability[] = [
  {
    icon: MessageSquare,
    title: "Chat with my portfolio",
    body: "A tool-calling assistant that answers only from this site's database. Watch it call tools and stream, on Grok or Gemini.",
    href: "/assistant",
    cta: "Try the chat",
    plain:
      "A chatbot that actually knows my work and links to the real thing instead of guessing.",
    tech: "Server-side tool-calling loop over the DAL (read-only, whitelisted fields), streamed with the AI SDK, bounded rounds + per-IP rate limits.",
  },
  {
    icon: FileCode2,
    title: "AI case-study generator",
    body: "Describe any system and get a typed architecture breakdown: components, data flow, trade-offs, and risks.",
    href: "/case-study",
    cta: "Generate one",
    plain:
      "Turn any system description into a clean, organized breakdown, automatically.",
    tech: "generateObject with a Zod schema forces valid structured output, no free-text parsing to babysit.",
  },
  {
    icon: Shuffle,
    title: "Provider-agnostic layer",
    body: "Every feature runs on Grok or Gemini, switchable live. Adding Anthropic or OpenAI is a one-line change.",
    href: "/assistant",
    cta: "See the switch",
    plain:
      "The AI here isn't tied to one company. I can swap the brain behind it instantly.",
    tech: "A thin provider registry over the AI SDK; models resolve by id, so vendor lock-in becomes a config value.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails by default",
    body: "Rate limits, bounded tool loops, timeouts, and graceful fallbacks on every AI surface.",
    plain:
      "Safety rails so the AI stays fast and cheap, and can't run away or break the page.",
    tech: "Per-IP limiter, stepCountIs ceilings, abort signals, provider-missing → 503, and onError fallbacks.",
  },
];

export function Capabilities() {
  return (
    <section className="py-14">
      <SectionHeader
        eyebrow="Capabilities"
        title="What I actually ship"
        description="Not slides. Live systems you can run right now, each one grounded, guarded, and provider-agnostic."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {CAPS.map((cap, i) => (
          <Reveal key={cap.title} delay={(i % 2) * 0.06}>
            <MotionCard className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
              <div className="mb-4 flex items-start justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                  <cap.icon className="h-5 w-5" />
                </span>
                <Explainer title={cap.title} plain={cap.plain} technical={cap.tech} />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight">
                {cap.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{cap.body}</p>
              {cap.href ? (
                <Link
                  href={cap.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary"
                >
                  {cap.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ) : null}
            </MotionCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
