"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { projectsDal } from "@/lib/dal/projects";
import { mediaDal } from "@/lib/dal/media";
import { uploadToStorage } from "@/lib/storage";
import { screenshotUrl } from "@/lib/admin/thumbnail";

const KINDS = ["AI_SYSTEM", "EXTERNAL_LIVE", "INTERNAL_DEMO", "NATIVE_APP"] as const;

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}
function nullable(v: string): string | null {
  return v.length ? v : null;
}
function splitTags(v: string): string[] {
  return v
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "Slug: lowercase letters, digits, and hyphens only."),
  title: z.string().min(1, "Title is required."),
  summary: z.string().min(1, "Summary is required."),
  kind: z.enum(KINDS),
  order: z.coerce.number().int().min(0).default(0),
});

export interface ProjectFormState {
  error?: string;
}

export async function saveProject(
  _prev: ProjectFormState | null,
  formData: FormData,
): Promise<ProjectFormState> {
  await requireAdmin();

  const id = str(formData.get("id"));
  const core = projectSchema.safeParse({
    slug: str(formData.get("slug")),
    title: str(formData.get("title")),
    summary: str(formData.get("summary")),
    kind: str(formData.get("kind")),
    order: str(formData.get("order")) || "0",
  });
  if (!core.success) {
    return { error: core.error.issues[0]?.message ?? "Invalid input." };
  }

  const data = {
    slug: core.data.slug,
    title: core.data.title,
    summary: core.data.summary,
    kind: core.data.kind,
    order: core.data.order,
    longform: nullable(str(formData.get("longform"))),
    tags: splitTags(str(formData.get("tags"))),
    repoUrl: nullable(str(formData.get("repoUrl"))),
    liveUrl: nullable(str(formData.get("liveUrl"))),
    thumbnailUrl: nullable(str(formData.get("thumbnailUrl"))),
    explainerTech: nullable(str(formData.get("explainerTech"))),
    explainerPlain: nullable(str(formData.get("explainerPlain"))),
    featured: formData.get("featured") === "on",
    published: formData.get("published") === "on",
  };

  try {
    if (id) await projectsDal.update(id, data);
    else await projectsDal.create(data);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Save failed.";
    if (message.includes("Unique") || message.includes("slug")) {
      return { error: "That slug is already taken." };
    }
    return { error: "Could not save the project." };
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await projectsDal.remove(id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function togglePublish(id: string, published: boolean) {
  await requireAdmin();
  await projectsDal.update(id, { published });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export interface MediaFormState {
  error?: string;
  ok?: boolean;
}

export async function uploadMedia(
  _prev: MediaFormState | null,
  formData: FormData,
): Promise<MediaFormState> {
  await requireAdmin();
  const projectId = str(formData.get("projectId"));
  const file = formData.get("file");
  const type = str(formData.get("type")) === "VIDEO" ? "VIDEO" : "IMAGE";
  const caption = nullable(str(formData.get("caption")));

  if (!projectId || !(file instanceof File) || file.size === 0) {
    return { error: "A project and a file are required." };
  }
  if (file.size > 50 * 1024 * 1024) {
    return { error: "File is larger than 50MB." };
  }

  try {
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const path = `projects/${projectId}/${randomUUID()}.${ext}`;
    const url = await uploadToStorage(path, await file.arrayBuffer(), file.type);
    await mediaDal.create({
      project: { connect: { id: projectId } },
      type,
      url,
      caption,
    });
  } catch {
    return { error: "Upload failed. Try again." };
  }

  revalidatePath(`/admin/projects/${projectId}/edit`);
  revalidatePath("/");
  return { ok: true };
}

export async function deleteMedia(id: string, projectId: string) {
  await requireAdmin();
  await mediaDal.remove(id);
  revalidatePath(`/admin/projects/${projectId}/edit`);
  revalidatePath("/");
}

export async function captureThumbnail(
  url: string,
): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  try {
    const shot = await screenshotUrl(url);
    const path = `thumbnails/${randomUUID()}.png`;
    const publicUrl = await uploadToStorage(path, shot.bytes, shot.contentType);
    return { url: publicUrl };
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Capture failed." };
  }
}
