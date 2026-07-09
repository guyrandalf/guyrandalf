import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rotate } from "@/lib/auth/service";
import {
  setAuthCookies,
  clearAuthCookies,
  getAuthCookies,
} from "@/lib/auth/cookies";

export async function POST() {
  const { refreshToken } = await getAuthCookies();
  if (!refreshToken) {
    return NextResponse.json({ error: "No session" }, { status: 401 });
  }

  const h = await headers();
  const tokens = await rotate(refreshToken, {
    userAgent: h.get("user-agent"),
    ip: h.get("x-forwarded-for"),
  });

  if (!tokens) {
    await clearAuthCookies();
    return NextResponse.json({ error: "Invalid session" }, { status: 401 });
  }

  await setAuthCookies(tokens.accessToken, tokens.refreshToken);
  return NextResponse.json({ ok: true });
}
