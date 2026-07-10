"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { educationDal } from "@/lib/dal/education";
import { skillsDal } from "@/lib/dal/skills";

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}
function nullable(v: string): string | null {
  return v.length ? v : null;
}

export interface ResumeFormState {
  error?: string;
  ok?: boolean;
}

const educationSchema = z.object({
  school: z.string().min(1, "School is required."),
  credential: z.string().min(1, "Credential is required."),
  startYear: z.coerce.number().int().min(1950).max(2100),
});

export async function createEducation(
  _prev: ResumeFormState | null,
  formData: FormData,
): Promise<ResumeFormState> {
  await requireAdmin();

  const parsed = educationSchema.safeParse({
    school: str(formData.get("school")),
    credential: str(formData.get("credential")),
    startYear: str(formData.get("startYear")),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const current = formData.get("current") === "on";
  const endYearRaw = str(formData.get("endYear"));

  await educationDal.create({
    school: parsed.data.school,
    credential: parsed.data.credential,
    field: nullable(str(formData.get("field"))),
    startYear: parsed.data.startYear,
    endYear: current || !endYearRaw ? null : Number(endYearRaw),
    current,
    description: nullable(str(formData.get("description"))),
    order: Number(str(formData.get("order")) || "0"),
  });

  revalidatePath("/");
  revalidatePath("/admin/education");
  return { ok: true };
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  await educationDal.remove(id);
  revalidatePath("/");
  revalidatePath("/admin/education");
}

const skillSchema = z.object({
  name: z.string().min(1, "Name is required."),
  category: z.string().min(1, "Category is required."),
});

export async function createSkill(
  _prev: ResumeFormState | null,
  formData: FormData,
): Promise<ResumeFormState> {
  await requireAdmin();

  const parsed = skillSchema.safeParse({
    name: str(formData.get("name")),
    category: str(formData.get("category")),
  });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  await skillsDal.create({
    name: parsed.data.name,
    category: parsed.data.category,
    featured: formData.get("featured") === "on",
    order: Number(str(formData.get("order")) || "0"),
  });

  revalidatePath("/");
  revalidatePath("/admin/skills");
  return { ok: true };
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await skillsDal.remove(id);
  revalidatePath("/");
  revalidatePath("/admin/skills");
}
