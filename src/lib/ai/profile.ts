// Bio/positioning the assistant can surface. Plain data (admin-editable later).
export const PROFILE = {
  name: "Guy Randalf",
  role: "AI Engineer (Full-Stack)",
  location: "Lagos, Nigeria · remote, available during US business hours",
  summary:
    "Full-stack engineer who ships production AI systems: tool-calling assistants, LLM-integrated products, and on-device AI, using Claude Code as a primary development tool.",
  focus: [
    "Production AI systems: agents, tool-calling, guardrails, fallbacks",
    "Full-stack: Next.js / React, Node, Postgres / Prisma, APIs",
    "Provider-agnostic LLM integration (Grok, Gemini, Claude, OpenAI)",
    "On-device / native AI (Swift + local foundation models)",
    "Claude Code as a daily driver for building and shipping",
  ],
  contact: {
    email: "guyrandalf93@gmail.com",
    github: "https://github.com/guyrandalf",
    linkedin: "https://linkedin.com/in/randalf",
  },
} as const;
