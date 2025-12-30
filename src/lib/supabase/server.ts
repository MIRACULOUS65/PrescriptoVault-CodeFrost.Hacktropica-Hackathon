import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { type NextRequest, NextResponse } from 'next/server';

export function createServerClient(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

    // Create a response to modify cookies
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value, options }) => {
                    request.cookies.set(name, value);
                });
                response = NextResponse.next({
                    request,
                });
                cookiesToSet.forEach(({ name, value, options }) => {
                    response.cookies.set(name, value, options);
                });
            },
        },
    });

    return { supabase, response };
}
