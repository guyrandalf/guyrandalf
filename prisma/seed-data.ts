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
    slug: "portfolio-assistant",
    title: "Chat with my portfolio",
    summary:
      "Ask anything about my work and get grounded, streamed answers. A tool-calling assistant that reads this site's database live, on Grok or Gemini.",
    kind: "AI_SYSTEM",
    tags: ["Tool calling", "Vercel AI SDK", "Grok", "Gemini", "Streaming"],
    featured: true,
    order: 1,
    liveUrl: "/assistant",
    explainerTech:
      "Server-side tool-calling loop over the DAL (read-only, whitelisted fields), streamed with the AI SDK; bounded rounds, per-IP limits, live provider switch. No vector DB: the corpus is small, so it reads Postgres directly.",
    explainerPlain:
      "A chatbot that actually knows my portfolio and links to the real thing instead of guessing.",
  },
  {
    slug: "ai-case-study-generator",
    title: "AI case-study generator",
    summary:
      "Describe a system or paste a repo URL and get a structured architecture breakdown, generated as typed data.",
    kind: "AI_SYSTEM",
    tags: ["Structured output", "Zod", "Grok", "Gemini"],
    featured: false,
    order: 2,
    liveUrl: "/case-study",
    explainerTech:
      "generateObject with a Zod schema forces valid structured output (components, data flow, trade-offs, risks), no free-text parsing to babysit.",
    explainerPlain:
      "Describe any software system and this turns it into a clean, organized breakdown, automatically.",
  },
  {
    slug: "multi-agent-decision-engine",
    title: "Multi-agent decision engine",
    summary:
      "Several specialized AI agents debate and converge on a decision. Hosted separately, added here through the admin with an auto-generated thumbnail.",
    kind: "EXTERNAL_LIVE",
    tags: ["Multi-agent", "Orchestration", "Decision-making"],
    featured: true,
    order: 3,
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
    order: 4,
    explainerTech:
      "A Zod-validated server-action form writes leads to Postgres through the DAL, matches a partner, and generates a discount code.",
    explainerPlain:
      "A mini business tool: someone submits a request, the system matches them to the right partner and gives them a discount code.",
  },
  {
    slug: "on-device-coreai-apps",
    title: "On-device CoreAI apps",
    summary:
      "Swift apps I built with Claude Code that run local foundation models on-device. Shown here as video and screenshots since they are native, not web.",
    kind: "NATIVE_APP",
    tags: ["Swift", "SwiftUI", "On-device AI", "Claude Code"],
    featured: true,
    order: 5,
    explainerTech:
      "Native SwiftUI apps calling on-device foundation models (no cloud round-trip), built with Claude Code as the primary development tool.",
    explainerPlain:
      "Phone and Mac apps where the AI runs entirely on the device, so it is fast and private.",
  },
];
