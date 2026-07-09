import { NextResponse, type NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/tokens";
import { ACCESS_COOKIE } from "@/lib/auth/constants";

// Next.js 16: this is `proxy.ts` (renamed from middleware.ts), runs on the
// Node.js runtime. We keep it stateless: verify the access token's signature
// + admin claim. No DB in the hot path.
const PUBLIC_PREFIXES = ["/admin/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_COOKIE)?.value;
  if (!token) return redirectToLogin(request);

  try {
    const claims = await verifyAccessToken(token);
    if (claims.role !== "ADMIN") return redirectToLogin(request);
  } catch {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin/:path*"],
};
