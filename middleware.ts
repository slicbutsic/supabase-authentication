import { NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  // Assuming `user` is retrieved from `updateSession` or session logic
  const user = true; // Replace this with actual check, e.g., from session or JWT

  // If the user is authenticated and trying to visit the homepage ('/'), redirect to '/private'
  if (user && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/private', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
