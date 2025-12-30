import { supabase } from './client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'doctor' | 'patient' | 'pharmacy' | 'admin';

export interface UserProfile {
    id: string;
    email: string;
    role: UserRole | null;
    name: string | null;
    verified: boolean;
    created_at: string;
    updated_at: string;
}

export interface AuthResponse {
    success: boolean;
    error?: string;
    user?: SupabaseUser;
    profile?: UserProfile | null;
}

/**
 * Sign in with email - sends OTP to user's email
 */
export async function signInWithEmail(email: string): Promise<AuthResponse> {
    try {
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                shouldCreateUser: true,
                // Don't include emailRedirectTo - we want OTP codes, not magic links
            },
        });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to send verification email' };
    }
}

/**
 * Verify OTP code sent to email
 */
export async function verifyOTP(email: string, token: string): Promise<AuthResponse> {
    try {
        const { data, error } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });

        if (error) {
            return { success: false, error: error.message };
        }

        if (!data.user) {
            return { success: false, error: 'No user returned from verification' };
        }

        return { success: true, user: data.user };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to verify code' };
    }
}

/**
 * Update user's role in the database
 */
export async function updateUserRole(userId: string, role: UserRole): Promise<AuthResponse> {
    try {
        console.log('🔧 updateUserRole called with:', { userId, role });

        // Use upsert instead of update to handle cases where the profile row doesn't exist yet
        const { data, error } = await supabase
            .from('users')
            .upsert(
                { id: userId, role, updated_at: new Date().toISOString() },
                { onConflict: 'id' }
            )
            .select()
            .single();

        console.log('📊 Supabase upsert result:', { data, error });

        if (error) {
            console.error('❌ Supabase upsert error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ Role updated successfully via upsert:', data);
        return { success: true, profile: data as UserProfile };
    } catch (error: any) {
        console.error('❌ Caught exception in updateUserRole:', error);
        return { success: false, error: error.message || 'Failed to update role' };
    }
}

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string): Promise<AuthResponse> {
    console.log('📂 getUserProfile called with userId:', userId);
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();

        console.log('📋 getUserProfile query result:', { data, error });

        if (error) {
            // Handle PGRST116: The result contains 0 rows
            if (error.code === 'PGRST116') {
                console.warn('⚠️ getUserProfile: No profile found for user:', userId);
                return { success: true, profile: null };
            }
            console.error('❌ getUserProfile error:', error);
            return { success: false, error: error.message };
        }

        console.log('✅ getUserProfile success:', data);
        return { success: true, profile: data as UserProfile };
    } catch (error: any) {
        console.error('❌ getUserProfile exception:', error);
        return { success: false, error: error.message || 'Failed to get user profile' };
    }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResponse> {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message || 'Failed to sign out' };
    }
}

/**
 * Get current session
 */
export async function getSession() {
    try {
        const { data, error } = await supabase.auth.getSession();

        if (error) {
            return { session: null, error: error.message };
        }

        return { session: data.session, error: null };
    } catch (error: any) {
        return { session: null, error: error.message };
    }
}

/**
 * Get current user
 */
export async function getCurrentUser() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            return { user: null, error: error.message };
        }

        return { user, error: null };
    } catch (error: any) {
        return { user: null, error: error.message };
    }
}
