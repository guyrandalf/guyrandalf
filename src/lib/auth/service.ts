import "server-only";
import { createHash, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { usersDal } from "@/lib/dal/users";
import { sessionsDal } from "@/lib/dal/sessions";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  REFRESH_TTL_SECONDS,
  type UserRole,
} from "./tokens";

interface RequestMeta {
  userAgent?: string | null;
  ip?: string | null;
}

export interface IssuedTokens {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: UserRole;
    firstName: string;
    lastName: string;
  };
}

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function issueSession(
  user: { id: string; email: string; role: UserRole },
  meta?: RequestMeta,
) {
  const jti = randomUUID();
  const refreshToken = await signRefreshToken({ sub: user.id, jti });
  await sessionsDal.create({
    userId: user.id,
    jti,
    hashedToken: hashToken(refreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TTL_SECONDS * 1000),
    userAgent: meta?.userAgent ?? null,
    ip: meta?.ip ?? null,
  });
  const accessToken = await signAccessToken({
    sub: user.id,
    role: user.role,
    email: user.email,
  });
  return { accessToken, refreshToken };
}

/** Verify credentials and start a session. Returns null on any failure (no info leak). */
export async function authenticate(
  email: string,
  password: string,
  meta?: RequestMeta,
): Promise<IssuedTokens | null> {
  const user = await usersDal.findByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;
  const tokens = await issueSession(
    { id: user.id, email: user.email, role: user.role },
    meta,
  );
  return {
    ...tokens,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
}

/** Rotate a refresh token (one-time use) with reuse detection (family invalidation). */
export async function rotate(
  refreshToken: string,
  meta?: RequestMeta,
): Promise<IssuedTokens | null> {
  let claims;
  try {
    claims = await verifyRefreshToken(refreshToken);
  } catch {
    return null;
  }
  if (!claims.jti || !claims.sub) return null;

  const session = await sessionsDal.findByJti(claims.jti);
  if (!session) return null;

  // Reuse detection: a revoked token being presented again means the family is
  // compromised. Invalidate every active session for the user (RFC 8725 §5).
  if (session.revokedAt) {
    await sessionsDal.revokeAllForUser(claims.sub);
    return null;
  }
  if (session.hashedToken !== hashToken(refreshToken)) return null;
  if (session.expiresAt.getTime() < Date.now()) return null;

  const user = await usersDal.findById(claims.sub);
  if (!user) return null;

  await sessionsDal.revokeByJti(claims.jti);
  const tokens = await issueSession(
    { id: user.id, email: user.email, role: user.role },
    meta,
  );
  return {
    ...tokens,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
}

/** Revoke the session behind a refresh token (logout). */
export async function revokeSession(refreshToken: string) {
  try {
    const claims = await verifyRefreshToken(refreshToken);
    if (claims.jti) await sessionsDal.revokeByJti(claims.jti);
  } catch {
    // Invalid token: nothing to revoke.
  }
}
