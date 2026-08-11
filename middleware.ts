import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Read Auth.js cookie directly. In production, this can vary by secure prefix.
    const token = request.cookies.get('authjs.session-token') || request.cookies.get('__Secure-authjs.session-token');

    // Protect /dashboard, /profile, /settings, /admin
    if (!token && (request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/profile') || request.nextUrl.pathname.startsWith('/settings') || request.nextUrl.pathname.startsWith('/admin'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/admin/:path*'],
};
