# Deployment

This is a reference for when you deploy. Nothing here runs automatically, you own the deploy.

## 1. Provision a production database + storage (Supabase cloud)

1. Create a Supabase project. From **Project Settings → Database**, copy the connection string.
2. From **Project Settings → API keys**, copy the **secret** key (`sb_secret_...`) and the **publishable** key.
3. In **Storage**, note you do not need to pre-create the `media` bucket, the app creates it (public) on first upload. If you prefer, create a public bucket named `media` yourself.

## 2. Set production environment variables

On your host (e.g. Vercel → Project → Settings → Environment Variables), set:

```
DATABASE_URL                     # Supabase cloud Postgres (use the pooled connection for serverless)
DIRECT_URL                       # Supabase direct connection (for migrations)
NEXT_PUBLIC_SUPABASE_URL         # https://<ref>.supabase.co
SUPABASE_SECRET_KEY              # sb_secret_... (server only)
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
JWT_ACCESS_SECRET                # generate fresh: openssl rand -hex 32
JWT_REFRESH_SECRET               # generate fresh: openssl rand -hex 32
JWT_ISSUER / JWT_AUDIENCE
ADMIN_EMAIL / ADMIN_PASSWORD     # your real admin login
AI_PROVIDER=xai
XAI_API_KEY
XAI_MODEL / XAI_API_URL
GOOGLE_GENERATIVE_AI_API_KEY
GEMINI_MODEL
SCREENSHOT_API_KEY               # optional (microlink works without it)
```

Notes:
- Generate **new** JWT secrets for production, do not reuse the local ones.
- `NODE_ENV=production` makes the auth cookies `Secure`, so serve over HTTPS.

## 3. Apply the schema + seed the admin

Against the production database (once):

```bash
# Point both at the DIRECT (5432) connection for this one-time setup.
DATABASE_URL="<prod-direct-url>" DIRECT_URL="<prod-direct-url>" bunx prisma migrate deploy
DATABASE_URL="<prod-direct-url>" ADMIN_EMAIL="..." ADMIN_PASSWORD="..." bun run db:seed
```

Neither migrations nor seeding run automatically on `git push` / Vercel build. This is a deliberate, one-time step (re-run `migrate deploy` only when the schema changes; do not re-run the seed, it resets the admin password and re-adds starter projects).

## 4. Build + deploy

The build runs `prisma generate && next build`. On Vercel, set the install command to `bun install` and it works out of the box. `proxy.ts` (the auth gate) runs on the Node.js runtime.

## 5. After deploy

- Sign in at `/admin/login`, add your real projects, upload your Swift/CoreAI app videos, and set the external multi-agent project's live URL + thumbnail.
- The home page is `force-dynamic`, so new content shows immediately.

## Notes / follow-ups

- The per-IP rate limiter is in-memory (per instance). For multi-instance production, swap `src/lib/ai/rate-limit.ts` for Upstash Redis.
- Thumbnails and media are served from Supabase Storage public URLs. They render via `<img>`/`<video>` today; switch to `next/image` later if you want optimization (add the Storage host to `images.remotePatterns`).
