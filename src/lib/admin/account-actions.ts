"use server";

import bcrypt from "bcryptjs";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/session";
import { sessionsDal } from "@/lib/dal/sessions";
import { usersDal } from "@/lib/dal/users";

export interface PasswordFormState {
  error?: string;
  ok?: boolean;
}

const schema = z.object({
  current: z.string().min(1),
  next: z.string().min(8, "New password must be at least 8 characters."),
});

function str(v: FormDataEntryValue | null) {
  return typeof v === "string" ? v : "";
}

export async function changePassword(
  _prev: PasswordFormState | null,
  formData: FormData,
): Promise<PasswordFormState> {
  const admin = await requireAdmin();
  const current = str(formData.get("current"));
  const next = str(formData.get("next"));
  const confirm = str(formData.get("confirm"));

  const parsed = schema.safeParse({ current, next });
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  if (next !== confirm) return { error: "New passwords do not match." };
  if (current === next) {
    return { error: "New password must be different from the current one." };
  }

  const user = await usersDal.findById(admin.id);
  if (!user) return { error: "Account not found." };

  const ok = await bcrypt.compare(current, user.password);
  if (!ok) return { error: "Current password is incorrect." };

  const hashed = await bcrypt.hash(next, 12);
  await usersDal.updatePassword(user.id, hashed);
  // Invalidate refresh tokens everywhere else (standard on password change).
  await sessionsDal.revokeAllForUser(user.id);
  return { ok: true };
}
