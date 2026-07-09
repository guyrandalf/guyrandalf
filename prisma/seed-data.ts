import type { ProjectKind } from "../src/generated/prisma/client";

export interface SeedProject {
  slug: string;
  title: string;
  summary: string;
  kind: ProjectKind;
  tags: string[];
  featured: boolean;
  order: number;
  liveUrl?: string;
  repoUrl?: string;
  explainerTech: string;
  explainerPlain: string;
}

export const seedProjects: SeedProject[] = [
  {
    slug: "portfolio-rag-chat",
    title: "Chat with my portfolio",
    summary:
      "Ask anything about my work and get streamed, cited answers. Retrieval-augmented generation over my projects and experience.",
    kind: "AI_SYSTEM",
    tags: ["RAG", "pgvector", "Vercel AI SDK", "Grok", "Streaming"],
    featured: true,
    order: 1,
    explainerTech:
      "Content is chunked, embedded, and stored in Postgres (pgvector, HNSW index). A question is embedded, nearest chunks are retrieved by cosine distance, and a grounded answer streams back with citations via the AI SDK.",
    explainerPlain:
      "A chatbot that actually knows my portfolio. Ask it what I've built and it answers in plain English with links to the real thing, instead of making things up.",
  },
  {
    slug: "ai-agent-playground",
    title: "Live AI agent playground",
    summary:
      "Trigger a real autonomous agent that plans, calls tools, and shows its work, with guardrails and fallbacks visible in real time.",
    kind: "AI_SYSTEM",
    tags: ["AI agents", "Tool calling", "Guardrails", "Streaming"],
    featured: true,
    order: 2,
    explainerTech:
      "A bounded tool-calling loop with a fixed step budget, Zod-typed tool schemas, per-step timeouts, and an explicit fallback path. Every step (reasoning, tool call, result) streams to the UI.",
    explainerPlain:
      "Watch an AI assistant do a multi-step task by itself, safely. You see every step it takes and the safety rails that keep it in bounds.",
  },
  {
    slug: "ai-case-study-generator",
    title: "AI case-study generator",
    summary:
      "Describe a system or paste a repo URL and get a structured architecture breakdown, generated and streamed as typed data.",
    kind: "AI_SYSTEM",
    tags: ["LLM", "Structured output", "Zod", "Streaming"],
    featured: false,
    order: 3,
    explainerTech:
      "Uses generateObject with a Zod schema to force structured output: components, data flow, trade-offs, and risks, rendered as it streams in.",
    explainerPlain:
      "Describe any software system and this turns it into a clean, organized breakdown of how it works, automatically.",
  },
  {
    slug: "multi-agent-decision-engine",
    title: "Multi-agent decision engine",
    summary:
      "Several specialized AI agents debate and converge on a decision. Hosted separately, added here through the admin with an auto-generated thumbnail.",
    kind: "EXTERNAL_LIVE",
    tags: ["Multi-agent", "Orchestration", "Decision-making"],
    featured: true,
    order: 4,
    liveUrl: "https://example.com",
    explainerTech:
      "Role-specialized agents exchange messages and converge on an outcome, with a coordinator resolving conflicts and a final vote.",
    explainerPlain:
      "Instead of one AI, a small team of AIs, each with a job, talk it out and agree on the best answer together.",
  },
  {
    slug: "referral-lead-connector",
    title: "Referral lead connector",
    summary:
      "A database-backed lead intake and partner-matching demo with discount-code generation. The full-stack fundamentals under the AI work.",
    kind: "INTERNAL_DEMO",
    tags: ["Next.js", "Server Actions", "Postgres", "Zod"],
    featured: false,
    order: 5,
    explainerTech:
      "A Zod-validated server-action form writes leads to Postgres through the DAL, matches a partner, and generates a discount code. Demonstrates the reliable CRUD + business-logic layer.",
    explainerPlain:
      "A mini business tool: someone submits a request, the system matches them to the right partner and gives them a discount code. Proof I build the everyday plumbing well too.",
  },
  {
    slug: "on-device-coreai-apps",
    title: "On-device CoreAI apps",
    summary:
      "Swift apps I built with Claude Code that run local foundation models on-device. Shown here as video and screenshots since they are native, not web.",
    kind: "NATIVE_APP",
    tags: ["Swift", "SwiftUI", "On-device AI", "Claude Code"],
    featured: true,
    order: 6,
    explainerTech:
      "Native SwiftUI apps calling on-device foundation models (no cloud round-trip), built with Claude Code as the primary development tool. Private, offline-capable inference.",
    explainerPlain:
      "Phone and Mac apps where the AI runs entirely on the device, so it is fast and private. They can't be embedded in a website, so here they are as videos and screenshots.",
  },
];
