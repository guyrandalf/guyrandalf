import "server-only";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "./constants";
import { ACCESS_TTL_SECONDS, REFRESH_TTL_SECONDS } from "./tokens";

const base = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setAuthCookies(
  accessToken: string,
  refreshToken: string,
) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, {
    ...base,
    maxAge: ACCESS_TTL_SECONDS,
  });
  store.set(REFRESH_COOKIE, refreshToken, {
    ...base,
    maxAge: REFRESH_TTL_SECONDS,
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAuthCookies() {
  const store = await cookies();
  return {
    accessToken: store.get(ACCESS_COOKIE)?.value,
    refreshToken: store.get(REFRESH_COOKIE)?.value,
  };
}
