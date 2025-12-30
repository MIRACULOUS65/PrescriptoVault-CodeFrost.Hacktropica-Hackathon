import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// TEMPORARILY DISABLED - Using client-side auth checks instead
// Supabase stores session in localStorage, not cookies
// Server-side middleware cannot access localStorage

export async function middleware(request: NextRequest) {
    // Allow all requests through - auth is handled client-side
    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        '/doctor/:path*',
        '/patient/:path*',
        '/pharmacy/:path*',
        '/admin/:path*',
    ],
};
