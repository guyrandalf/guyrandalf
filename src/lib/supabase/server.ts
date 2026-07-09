import "server-only";
import { createClient } from "@supabase/supabase-js";

// Server-only Supabase admin client using the SECRET key. It bypasses RLS, so
// our own JWT layer is the gatekeeper: only ever import this into server code
// (server actions, route handlers, DAL). NEVER into a client component.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;

if (!url || !secret) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY in the environment.",
  );
}

export const supabaseAdmin = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// Bucket name for portfolio media (project screenshots + Swift-app videos).
export const MEDIA_BUCKET = "media";
