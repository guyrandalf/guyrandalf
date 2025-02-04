import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /auth/profile route
  if (request.nextUrl.pathname.startsWith("/projects/auth/profile")) {
    if (!session) {
      return NextResponse.redirect(new URL("/projects/auth", request.url));
    }
  }

  // Prevent authenticated users from accessing auth pages
  if (request.nextUrl.pathname === "/projects/auth") {
    if (session) {
      return NextResponse.redirect(
        new URL("/projects/auth/profile", request.url)
      );
    }
  }

  return res;
}

export const config = {
  matcher: ["/projects/auth/:path*"],
};
