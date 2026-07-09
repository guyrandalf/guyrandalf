import "server-only";
import { tool } from "ai";
import { z } from "zod";
import { projectsDal, type ProjectWithMedia } from "@/lib/dal/projects";
import { PROFILE } from "./profile";

// SECURITY / DATA BOUNDARY (mirrors the referral-assistant pattern):
// these executors ARE the boundary. Rules:
//   1. Read-only only. No tool mutates data (this is a public bot).
//   2. Only return PUBLISHED projects.
//   3. Return an explicit field whitelist, never a raw Prisma object.
const KINDS = [
  "AI_SYSTEM",
  "EXTERNAL_LIVE",
  "INTERNAL_DEMO",
  "NATIVE_APP",
] as const;

function publicProject(p: ProjectWithMedia) {
  return {
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    kind: p.kind,
    tags: p.tags,
    featured: p.featured,
    liveUrl: p.liveUrl ?? undefined,
    repoUrl: p.repoUrl ?? undefined,
  };
}

export const portfolioTools = {
  list_projects: tool({
    description:
      "List Guy's published portfolio projects. Optionally filter by kind. Use for 'what has he built', 'show his AI systems', etc.",
    inputSchema: z.object({
      kind: z
        .enum(KINDS)
        .optional()
        .describe("Optional filter: AI_SYSTEM, EXTERNAL_LIVE, INTERNAL_DEMO, NATIVE_APP."),
    }),
    execute: async ({ kind }) => {
      const all = await projectsDal.listPublished();
      const filtered = kind ? all.filter((p) => p.kind === kind) : all;
      return { projects: filtered.map(publicProject) };
    },
  }),

  get_project: tool({
    description:
      "Get full details for one project by slug, including the long-form write-up and how it was built. Use after list_projects for specifics.",
    inputSchema: z.object({
      slug: z.string().describe("Project slug, e.g. 'portfolio-assistant'."),
    }),
    execute: async ({ slug }) => {
      const p = await projectsDal.bySlug(slug);
      if (!p || !p.published) {
        return { error: "No published project with that slug." };
      }
      return {
        project: {
          ...publicProject(p),
          longform: p.longform ?? undefined,
          howItWasBuilt: p.explainerTech ?? undefined,
          plainExplanation: p.explainerPlain ?? undefined,
          media: p.media.map((m) => ({
            type: m.type,
            url: m.url,
            caption: m.caption ?? undefined,
          })),
        },
      };
    },
  }),

  about_me: tool({
    description:
      "Get Guy's background: role, focus areas, location, and contact. Use for 'who is he', 'what does he do', 'how do I reach him'.",
    inputSchema: z.object({}),
    execute: async () => ({ profile: PROFILE }),
  }),
};
