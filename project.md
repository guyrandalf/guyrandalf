# Portfolio Rebuild — Master Plan

> Living document. Repositioning `guyrandalf` from a junior CRUD-demo portfolio into a
> production, full-stack **AI system** that doubles as the Loom deliverable for the
> **AI Engineer (Full-Stack)** role. Update the checkboxes as phases land.

Last verified against live docs: **July 2026**.

---

## 1. Goal

Turn this site into living proof that I:

- Build and ship **full-stack AI systems in production** (RAG, agents, LLM-integrated features, guardrails).
- Use **Claude Code** as my daily engineering driver.
- Own systems end to end: backend services, APIs, data models, frontend, AI integration.
- Write clean, reusable, well-architected code (isolated DAL, no copy-paste across components).

The site itself is the portfolio piece. Non-technical and technical reviewers both get
an easy, guided, colorful experience where **every feature explains itself on hover**
(what it is, its real-world purpose, how it was built), with a **technical ⇄ non-technical** toggle.

## 2. Locked decisions

| Decision | Choice |
|---|---|
| Default theme | **Light**, with toggle (no forced system) |
| Design direction | **Premium & fluid** (clean light base, vibrant gradient accents, glassmorphism, Antigravity-style motion) |
| Auth | **Pure JWT** with `jose`, httpOnly cookies, refresh rotation. **No Supabase Auth.** |
| Who logs in | Admin (me) for `/admin` + a **sandboxed demo login** that showcases the JWT flow |
| Supabase role | **Database + Storage + everything else it offers**, minus Auth |
| LLM provider | **xAI / Grok** (cheap), behind a **swappable provider layer** so I can flip to Claude for the Loom/interview |
| Embeddings | Verify at Phase 3; Grok may have no embeddings endpoint. Fallback: OpenAI `text-embedding-3-small` or a local open model. Vectors live in **pgvector**. |
| Content | Moves from static `src/data/projects.ts` into the **DB**, editable from `/admin` |
| Package manager / runtime | **Bun** (replaces yarn; remove `yarn.lock`) |
| UI layer | **shadcn/ui + Tailwind**, Radix pruned to only primitives actually used (shadcn IS Tailwind+Radix; you own the component source, Radix does a11y plumbing only) |
| Projects kept | **Referral Lead Connector** (reframed, + AI matching) and the **real JWT auth + demo login**. Cut: auth-form demo, pagination, search-filter, todo-CRUD. Old real-time chat is absorbed by the RAG chat. |

## 3. Verified stack (July 2026)

| Area | From | To |
|---|---|---|
| Next.js | 15.1.9 | **16.2.x LTS** (`middleware.ts` → **`proxy.ts`**, fn `middleware`→`proxy`; async request APIs; new caching defaults) |
| React | 19.0.1 | **19.2.x** + **React Compiler v1** enabled |
| Tailwind | v3 | **v4** (CSS-first `@theme`, OKLCH, `tailwindcss-animate` → `tw-animate-css`) |
| Animation | framer-motion 12 | **`motion`** (import from `motion/react`) |
| Supabase | `@supabase/auth-helpers-nextjs` (deprecated) | `@supabase/supabase-js` server-only service client only |
| JWT | `jsonwebtoken` | **`jose`** (Web Crypto, Edge-safe for `proxy.ts`) |
| AI | none | **Vercel AI SDK v5** + `@ai-sdk/xai` (swappable to `@ai-sdk/anthropic`) |
| Vectors | none | **pgvector** in Supabase Postgres (HNSW index, `match_*` `rpc()` fn) |
| Toasts | `react-toastify` + `sonner` | **`sonner`** only |
| ORM | Prisma 6 | Prisma latest 6.x |

## 4. Architecture principles

- **Server Components first.** Client components only for genuine interactivity (motion, forms, chat stream, theme toggle, admin editors). No `zustand` global auth store; auth state comes from the server via cookies + `getCurrentUser()`.
- **One DAL, reused everywhere.** All DB access lives in `src/lib/dal/*` (server-only). Components and route handlers never touch Prisma directly.
- **Provider-agnostic AI.** A thin `src/lib/ai/*` layer wraps the AI SDK so provider = one config swap.
- **Server-only secrets.** Supabase secret key, JWT secrets, xAI key never reach the browser. Storage writes go through JWT-protected server actions/route handlers using the service client.
- **Every feature is self-documenting.** A reusable `<Explainer>` primitive powers hover cards on every section, wired to the technical/non-technical toggle.
- **Guardrails by default.** Rate limiting, spend caps, timeouts, and graceful fallbacks on every AI surface (this is a scored requirement in the JD).

---

## 5. Phases

### Phase 0 — Foundation + toolchain modernization ✅ DONE
- [x] Switch to **Bun**: removed `yarn.lock`, `bun.lock` written, scripts use `bun run`.
- [x] Populated `.env` with local Supabase creds, generated 256-bit JWT secrets, xAI + admin placeholders.
- [x] Verified exact latest versions (npm) and rewrote `package.json` (202 pkgs installed clean).
- [x] Removed: `framer-motion`, `react-toastify`, `@supabase/auth-helpers-nextjs`, `@supabase/ssr`, `react-type-animation`, `zustand`, `jsonwebtoken`, `tailwindcss-animate`, `date-fns`.
- [x] Added: `motion`, `jose`, `ai` + `@ai-sdk/{xai,react,openai}`, `@prisma/adapter-pg` + `pg`, `tw-animate-css`, `babel-plugin-react-compiler`.
- [x] Tailwind v3 → v4: deleted `tailwind.config.ts`, CSS-first `@theme inline` + OKLCH tokens in `globals.css`, `@tailwindcss/postcss`, `tw-animate-css`.
- [x] Next 15 → 16: `reactCompiler: true` enabled, build on Turbopack. (`proxy.ts` deferred to Phase 1 with the real auth.)
- [x] **Decision:** pinned **TypeScript 5.9.3** (not TS 7 native compiler, which has documented Next 16 build breakage). Everything else on current major.
- [x] `next-themes` default → **light**, `enableSystem={false}`.
- [x] Deck-cleared all cut code (junior projects, Supabase-auth, mobile API, static data, unused UI primitives).
- **Acceptance MET:** `bun run build` passes (`/` + `/_not-found` static); `bun run dev` returns 200 rendering the hero; light default confirmed (no `dark` class); `tsc --noEmit` clean.

### Phase 1 — Architecture: DAL + pure JWT auth ✅ DONE
- [x] `src/lib/dal/*`: `users`, `sessions` (server-only, Prisma-backed). Projects/media/leads/embeddings DAL land in Phase 2 with their models.
- [x] `src/lib/auth/*` with `jose`: **HS256** (RFC 8725-compliant for single issuer) with explicit algorithm allowlist + iss/aud/exp validation on verify. Access token 1h + rotating refresh 30d, both httpOnly `SameSite=lax` cookies. `getCurrentUser()` (stateless, no DB) + `requireAdmin()`.
- [x] **Refresh rotation with DB-tracked reuse detection** (`Session` table stores only sha256 of the token; presenting a revoked token invalidates the whole family, RFC 8725 §5).
- [x] Prisma 7 wired: new `prisma-client` generator → `src/generated/prisma`, `PrismaPg` driver adapter singleton, `url` moved to `prisma.config.ts` (`dotenv/config` + `datasource.url`). `User.role` enum, `init` migration applied to local Supabase Postgres.
- [x] Admin seeded from env (`ADMIN_EMAIL`/`ADMIN_PASSWORD`, bcrypt cost 12) via `prisma/seed.ts`.
- [x] **`proxy.ts` (Node runtime in Next 16, not Edge)** guards `/admin`, redirects to `/admin/login`. Server actions `loginAction`/`logoutAction` + `/api/auth/refresh` route.
- [x] Fixed: `.env` was silently empty (0 bytes) from an earlier failed write; now populated.
- **Acceptance MET (verified over HTTP):** unauth `/admin` → 307 to login; valid admin token → 200 with identity; `/api/auth/refresh` → 200 + rotated HttpOnly cookies; replayed refresh → 401 (reuse detected). `tsc` clean; production build green (`ƒ Proxy (Middleware)` present).
- **Deferred:** silent access-token refresh (client `SessionRefresher`) → Phase 4 polish; sandboxed public "demo login" showcase → Phase 5; Supabase service client + Storage DAL → Phase 2/4 (no Supabase Auth remains, so nothing to remove).

### Phase 2 — Data model + content in DB ✅ DONE
- [x] Prisma models `Project` (4 kinds), `Media`, `Lead` + enums; `content` migration applied to local Supabase Postgres.
- [x] DAL: `projects` (list/featured/bySlug/CRUD, typed `ProjectWithMedia`), `media`, `leads`. Server-only Supabase admin client (`src/lib/supabase/server.ts`, secret key) + `MEDIA_BUCKET`.
- [x] Seeded 6 real projects (3 AI systems, external multi-agent engine, referral connector, native CoreAI apps) with `explainerTech`/`explainerPlain` for the hover cards, via idempotent slug upserts.
- [x] Home page now renders projects **from the DB** (RSC + DAL, `force-dynamic`).
- **Acceptance MET:** home page 200, all seeded projects render from Postgres; `tsc` clean; build green (`/` now dynamic).
- **Gotcha logged:** `prisma migrate dev` did **not** auto-regenerate the client for the new models, had to run `prisma generate` explicitly before seed/typecheck passed.

> **Plan change (verified):** pgvector/`Embedding` moved to **Phase 3**. Prisma 7.1's `Unsupported("vector")` + `migrate dev` has a regression (prisma/prisma#28867) and the Supabase `extensions`-schema vs shadow-DB mismatch (#26231) makes Prisma-managed vectors fragile; embedding dimension is provider-dependent too. So vectors will live outside Prisma's managed schema: a dedicated SQL migration (`CREATE EXTENSION vector` + `vector(N)` column + HNSW index) queried via Prisma `$queryRaw`, so the shadow DB never sees `vector`.

### Phase 3 — AI systems (the headline)
> **Revised (verified with the user + live tests).** No embeddings / no pgvector: overkill for a small portfolio, and the user's own prod referral-assistant proves the right pattern is a **tool-calling loop grounded in the DB**. Architecture is now **provider-agnostic** (Grok + Gemini, extensible) with a **UI switcher** — multi-provider is itself a hireable signal ("not vendor-locked").
- [x] `src/lib/ai/providers.ts`: registry for `xai` (grok-4.3) + `google` (gemini-3-flash-preview), `languageModel()`, `resolveProvider()`. **Both providers verified live** via the AI SDK.
- [x] **Chat with my portfolio** ✅ — `useChat` + `streamText` with **DB-grounded tool-calling** (`list_projects`, `get_project`, `about_me` over the DAL). Streams, renders tool-call steps, UI provider switcher (`/assistant`). **Verified live on BOTH providers**: each called `list_projects` and grounded its answer in all 3 real seeded AI-system names.
- [x] Guardrails ported: boundary in executors (read-only, published-only, whitelisted fields), `MAX_TOOL_ROUNDS=5`, `MAX_HISTORY=24`, per-IP in-memory rate limit, `abortSignal`, `maxRetries`, provider-missing → 503, `onError` fallback. Prompt bans em dashes + "answer directly." (Prod rate-limit → Upstash later.)
- [x] **AI case-study generator** ✅ — `/case-study`: prompt/URL → `generateObject` (Zod schema) → typed architecture breakdown (components, data flow, trade-offs, risks, stack). Provider switch, rate-limited. **Verified live**: both Grok and Gemini returned valid structured objects (6 components, full flow/trade-offs/stack).
- [x] **AI-narrated tooltips** ✅ — `<Explainer>` hover cards (Radix HoverCard) following a global **Simple ⇄ Technical** toggle; wired onto home project cards from DB `explainerTech`/`explainerPlain`. `/api/explain` generates dual-audience `{plain, technical}` via `generateObject` (for the admin to auto-fill). **Verified live**: dual-audience output correct, triggers + toggle render.
- **Acceptance MET:** chat grounded in real DB content on **both** providers (3/3 names); case-study returns valid typed objects on both; tooltips render + explain endpoint works; graceful 503 when a key is missing, per-IP rate limiting. `tsc` clean; build green (`/api/chat`, `/api/case-study`, `/api/explain`).
- **Note:** "chat" + "agent playground" merged into one honest feature. Gemini key powers **generation**, not embeddings.

### PHASE 3 COMPLETE ✅ — the AI headline is built and verified.

### Phase 4 — Admin panel ✅ DONE
- [x] JWT-gated `/admin` (proxy + `requireAdmin` in `AdminShell`) with dashboard (project/published/lead stats).
- [x] Project CRUD: `/admin/projects` list + row publish/delete, `/admin/projects/new`, `/admin/projects/[id]/edit`. Server actions (`saveProject`/`deleteProject`/`togglePublish`) all re-check `requireAdmin`.
- [x] Media upload → **Supabase Storage** via service client (`uploadMedia` server action, `src/lib/storage.ts`); `MediaManager` for Swift-app videos/screenshots. Leads list at `/admin/leads`.
- [x] **Add external project by URL → auto-thumbnail**: `captureThumbnail` → microlink screenshot → re-uploaded to our Storage → public URL (self-hosted, not dependent on microlink). Free tier, no key needed (`SCREENSHOT_API_KEY` optional).
- [x] **AI-fill explainers** button in the form → `/api/explain` writes the Simple + Technical text.
- [x] No re-embed step needed (the chat reads live from the DB via tools, so new content is reflected immediately).
- **Acceptance MET (verified):** unauth `/admin` → 307; all admin pages render with a real admin session; DB create/update/delete works; microlink → Storage → public fetch works (39KB screenshot); `tsc` clean, build green (7 admin routes).

### Phase 5 — Redesign (Premium & fluid, light default) — landing DONE
> **Concept:** the portfolio as a **"model card" for a human engineer** (subject-true AI artifact). Luminous cool-white base, blue-black ink, electric indigo→magenta→cyan **spectrum gradient** signature (= multi-provider convergence). Bricolage Grotesque display + Inter body + Geist Mono for the technical vernacular (spec strips, tags).
- [x] Motion system (`motion/react`): ambient drift gradient, staggered hero load, scroll reveals, springy hover-lift cards. `useReducedMotion` honored + CSS `prefers-reduced-motion` guard.
- [x] Home sections: Hero (model-card + spec strip + live CTAs) → Capabilities (the live AI features) → Work (DB projects, rich cards) → On-device runtime (native Swift apps as video) → About (repositioned) → Contact ("Deploy me"). All copy repositioned for the AI Engineer role.
- [x] `<Explainer>` hover cards on capabilities, project cards, and native apps; Simple/Technical + light/dark toggles in the glass navbar.
- [x] New palette + fonts + `text-spectrum`/`bg-spectrum`/`glass` utilities; typecheck clean, build green, renders 200 with all sections.
- [x] **Redesign v2 after user review** (first pass was pastel-gradient soup + stale content). Now: clean high-contrast white base, single solid violet accent, per-category card colors (violet/sky/amber/emerald), no gradient washes. Content fixed (dropped RAG/pgvector language + the phantom "agent playground"; cards link to their live routes). Explainer converted to a **click/tap Popover** with the Simple/Technical switch inside it (works on mobile; nav toggle removed as redundant). Tighter spacing, native section is a full-width horizontal card.
- [x] **Verified with real screenshots** (installed Playwright headless): hero, capabilities, work, native, about, contact all render correctly in light + dark; explainer popover + inline toggle confirmed working. Build green.
- [x] **Inner pages premium pass**: `/assistant` + `/case-study` now have display-type headers, refined chat/generator surfaces, violet-gradient CTAs. Verified live via screenshot: assistant streams a correct grounded answer with a `used list_projects` tool chip; case-study form consistent. Chat prompt now avoids markdown so no literal `**` in replies.
- [ ] **Remaining polish:** `/admin` is still utilitarian (private, low priority); optional next/image for thumbnails.

### Phase 6 — Prod-readiness + skills + docs ✅ DONE (no deploy, user deploys)
- [x] Guardrails in place (per-IP rate limit, bounded tool loops, timeouts, fallbacks); spend/cost model documented (Grok cheap gen, Gemini free tier). In-memory limiter → Upstash noted for multi-instance.
- [x] **Docs**: `README.md` rewritten for the new positioning; `DEPLOYMENT.md` written (Supabase cloud env checklist, `migrate deploy` + seed, Vercel notes). No flip/deploy performed, per user.
- [x] **CI**: `.github/workflows/ci.yml` (Bun install + `biome ci` + typecheck). **Biome** added (formatter + linter, CSS excluded), `lint`/`format`/`check` scripts, whole repo formatted + clean.
- [x] **Global skills** written: `nextjs16-prisma7-supabase-stack` and `ai-sdk-multiprovider-toolcalling` (verified 2026 patterns + the real gotchas hit this build).
- [x] `next.config` images ready for prod (Supabase host `*.supabase.co`, local-IP allowed in dev) if switching `<img>` → `next/image` later.
- **Acceptance MET:** `biome ci` + `tsc` clean, build green. **Admin upload → home display verified E2E** in a real browser (login → upload media → shows on home; `<video>` path confirmed).

---
## STATUS: Phases 0-6 complete. App is functional, verified, documented, and ready for the user to deploy.

---

## 6. Env vars (Phase 0 wires local values)

```
# Database (Prisma → local Supabase Postgres; flip to cloud for prod)
DATABASE_URL / DIRECT_URL

# Supabase (DB + Storage; NO Auth)
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SECRET_KEY            # sb_secret_... (service role equivalent, server only)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
SUPABASE_S3_ENDPOINT / SUPABASE_S3_ACCESS_KEY / SUPABASE_S3_SECRET_KEY / SUPABASE_S3_REGION

# Auth (jose)
JWT_ACCESS_SECRET / JWT_REFRESH_SECRET / JWT_ISSUER / JWT_AUDIENCE

# Admin seed
ADMIN_EMAIL / ADMIN_PASSWORD

# AI
XAI_API_KEY                   # provider = xai (swap-ready)
EMBEDDINGS_API_KEY            # provider TBD at Phase 3

# Misc
SCREENSHOT_API_KEY            # external-project thumbnails (Phase 4)
```

## 7. Open items / risks

- Embeddings provider: confirm whether Grok exposes embeddings; else pick a cheap dedicated one (Phase 3).
- Screenshot service choice + free-tier limits (Phase 4).
- xAI key not yet provided; AI phases need it to run live. Everything scaffolds with a placeholder.
- Public AI on a portfolio = cost exposure; guardrails + caching are mandatory, not optional.
- Prod DB/storage switch is a config flip; verify Supabase cloud parity before launch.
