import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
        // Exchange code for session
        await supabase.auth.exchangeCodeForSession(code);
    }

    // Redirect to verify wallet after auth
    return NextResponse.redirect(new URL('/verify-wallet', request.url));
}
