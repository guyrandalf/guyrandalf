import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyJwt } from './lib/jwt'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();

  // Handle API routes with JWT
  if (request.nextUrl.pathname.startsWith('/mobile/api')) {
    // Skip auth check for auth routes
    if (request.nextUrl.pathname.startsWith('/mobile/api/auth')) {
      return NextResponse.next()
    }
      const token = request.headers.get('authorization')?.split(' ')[1]
      
      if (!token) {
        return NextResponse.json(
          { error: 'Missing authentication token' },
          { status: 401 }
        )
      }

      const payload = verifyJwt(token)
      if (!payload) {
        return NextResponse.json(
          { error: 'Invalid authentication token' },
          { status: 401 }
        )
      }
    request.headers.set('x-user-id', payload.userId)
    return NextResponse.next()
  }

  // Handle web routes with Supabase auth
  const supabase = createMiddlewareClient({ req: request, res });

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) throw error;

    if (request.nextUrl.pathname.startsWith('/projects/auth/profile')) {
      if (!session) {
        return NextResponse.redirect(new URL('/projects/auth', request.url));
      }
    }

    return res;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/projects/auth', request.url));
  }
}

export const config = {
  matcher: [
    // Match API routes
    '/mobile/api/:path*',
    // Match web routes that need protection
    '/projects/auth/profile'
  ]
}