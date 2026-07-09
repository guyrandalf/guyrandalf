# guyrandalf

A production AI portfolio for an **AI Engineer (Full-Stack)**. The site is itself a live, multi-provider AI system, not a static resume.

## What it does

- **Chat with my portfolio** (`/assistant`): a tool-calling assistant grounded in the site's Postgres through a server-side DAL. It streams, shows its tool calls, and switches between **Grok** and **Gemini** live. No made-up answers.
- **AI case-study generator** (`/case-study`): paste a system description or repo URL, get a typed architecture breakdown via structured output (Zod).
- **Provider-agnostic AI layer**: xAI (Grok) + Google (Gemini) behind one registry; adding Anthropic or OpenAI is a one-line change.
- **Self-service admin** (`/admin`): pure-JWT gated CRUD for projects, media, and leads. Upload Swift / CoreAI app videos to Supabase Storage, or add an externally-hosted project by URL and auto-capture a thumbnail.
- **Hover explainers** on every feature, with a Simple ⇄ Technical toggle.

## Stack

Next.js 16 (App Router, Turbopack, React Compiler) · React 19.2 · Tailwind v4 · Prisma 7 + Supabase Postgres · pure-JWT auth (`jose`, rotating refresh + reuse detection) · Vercel AI SDK · Motion · Bun · Biome.

## Local development

Prereqs: [Bun](https://bun.sh) and a running local Supabase stack (`supabase start`), or any Postgres for the DB plus Supabase for Storage.

```bash
bun install
# .env already holds the local Supabase values (it is gitignored)
bun run db:migrate    # apply the schema to local Postgres
bun run db:seed       # seed the admin user + starter projects
bun run dev           # http://localhost:3000
```

Sign in to the admin at `/admin/login` with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`. To rotate the password, change it in `.env` and re-run `bun run db:seed`.

## Scripts

| Command | What it does |
|---|---|
| `bun run dev` / `build` / `start` | Next.js dev / production build / serve |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run check` / `lint` / `format` | Biome |
| `bun run db:migrate` / `db:seed` / `db:studio` / `db:reset` | Prisma |

## Environment

All config lives in `.env` (gitignored). Key vars: `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `XAI_API_KEY`, `GOOGLE_GENERATIVE_AI_API_KEY`.

## Deploying

See [`DEPLOYMENT.md`](./DEPLOYMENT.md).

## AI cost + guardrails

Grok handles high-volume generation (cheap); Gemini's free tier is the alternate. Every AI route has per-IP rate limiting, bounded tool loops (`stepCountIs`), timeouts, and graceful fallbacks when a provider key is missing.
