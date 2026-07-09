"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { authenticate, revokeSession } from "./service";
import {
  setAuthCookies,
  clearAuthCookies,
  getAuthCookies,
} from "./cookies";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const h = await headers();
  const tokens = await authenticate(parsed.data.email, parsed.data.password, {
    userAgent: h.get("user-agent"),
    ip: h.get("x-forwarded-for"),
  });
  if (!tokens) {
    return { error: "Invalid credentials." };
  }

  await setAuthCookies(tokens.accessToken, tokens.refreshToken);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const { refreshToken } = await getAuthCookies();
  if (refreshToken) await revokeSession(refreshToken);
  await clearAuthCookies();
  redirect("/admin/login");
}
