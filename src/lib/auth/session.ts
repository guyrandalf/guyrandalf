import "server-only";
import { redirect } from "next/navigation";
import { getAuthCookies } from "./cookies";
import { type UserRole, verifyAccessToken } from "./tokens";

export interface SessionUser {
  id: string;
  role: UserRole;
  email: string;
}

/** Reads the access-token cookie and returns the user, or null. No DB hit. */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const { accessToken } = await getAuthCookies();
  if (!accessToken) return null;
  try {
    const claims = await verifyAccessToken(accessToken);
    if (!claims.sub) return null;
    return { id: claims.sub, role: claims.role, email: claims.email };
  } catch {
    return null;
  }
}

/** Guards admin server components. Redirects to the login page if not an admin. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (user?.role !== "ADMIN") {
    redirect("/admin/login");
  }
  return user;
}
