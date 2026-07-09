import { SignJWT, jwtVerify, type JWTPayload } from "jose";

// HS256 with a 256-bit secret is RFC 8725-compliant for a single-server issuer.
// We always: pin an explicit algorithm allowlist on verify, and validate iss/aud/exp.
const ISSUER = process.env.JWT_ISSUER ?? "guyrandalf.dev";
const AUDIENCE = process.env.JWT_AUDIENCE ?? "guyrandalf.dev";
const ALG = "HS256";

export const ACCESS_TTL_SECONDS = 60 * 60; // 1 hour
export const REFRESH_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export type UserRole = "USER" | "ADMIN";

function secret(name: "JWT_ACCESS_SECRET" | "JWT_REFRESH_SECRET") {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return new TextEncoder().encode(value);
}

export interface AccessClaims extends JWTPayload {
  sub: string;
  role: UserRole;
  email: string;
}

export interface RefreshClaims extends JWTPayload {
  sub: string;
  jti: string;
}

export async function signAccessToken(input: {
  sub: string;
  role: UserRole;
  email: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({ role: input.role, email: input.email })
    .setProtectedHeader({ alg: ALG, typ: "JWT" })
    .setSubject(input.sub)
    .setIssuedAt(now)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(now + ACCESS_TTL_SECONDS)
    .sign(secret("JWT_ACCESS_SECRET"));
}

export async function signRefreshToken(input: {
  sub: string;
  jti: string;
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  return new SignJWT({})
    .setProtectedHeader({ alg: ALG, typ: "JWT" })
    .setSubject(input.sub)
    .setJti(input.jti)
    .setIssuedAt(now)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(now + REFRESH_TTL_SECONDS)
    .sign(secret("JWT_REFRESH_SECRET"));
}

export async function verifyAccessToken(token: string): Promise<AccessClaims> {
  const { payload } = await jwtVerify(token, secret("JWT_ACCESS_SECRET"), {
    issuer: ISSUER,
    audience: AUDIENCE,
    algorithms: [ALG],
  });
  return payload as AccessClaims;
}

export async function verifyRefreshToken(token: string): Promise<RefreshClaims> {
  const { payload } = await jwtVerify(token, secret("JWT_REFRESH_SECRET"), {
    issuer: ISSUER,
    audience: AUDIENCE,
    algorithms: [ALG],
  });
  return payload as RefreshClaims;
}
