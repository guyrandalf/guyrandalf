import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    // Debug logs
    console.log('Current path:', request.nextUrl.pathname);
    console.log('Session:', session);

    // Protect profile route
    if (request.nextUrl.pathname.startsWith('/projects/auth/profile')) {
      if (!session) {
        return NextResponse.redirect(new URL('/projects/auth', request.url));
      }
    }

    // Set session cookie in response
    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/projects/auth', request.url));
  }
}