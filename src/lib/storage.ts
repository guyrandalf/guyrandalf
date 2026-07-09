import "server-only";
import { MEDIA_BUCKET, supabaseAdmin } from "@/lib/supabase/server";

async function ensureMediaBucket() {
  const { data } = await supabaseAdmin.storage.listBuckets();
  if (!data?.some((b) => b.name === MEDIA_BUCKET)) {
    await supabaseAdmin.storage.createBucket(MEDIA_BUCKET, { public: true });
  }
}

export async function uploadToStorage(
  path: string,
  body: ArrayBuffer | Uint8Array | Blob,
  contentType?: string,
): Promise<string> {
  await ensureMediaBucket();
  const { error } = await supabaseAdmin.storage
    .from(MEDIA_BUCKET)
    .upload(path, body, { upsert: true, contentType });
  if (error) throw new Error(`Upload failed: ${error.message}`);
  return supabaseAdmin.storage.from(MEDIA_BUCKET).getPublicUrl(path).data
    .publicUrl;
}

export async function removeFromStorage(paths: string[]) {
  await supabaseAdmin.storage.from(MEDIA_BUCKET).remove(paths);
}
