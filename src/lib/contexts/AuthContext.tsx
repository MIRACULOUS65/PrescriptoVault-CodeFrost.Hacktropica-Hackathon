"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { getUserProfile, type UserRole, type UserProfile } from '../supabase/auth';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
    user: SupabaseUser | null;
    profile: UserProfile | null;
    role: UserRole | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<SupabaseUser | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profileLoaded, setProfileLoaded] = useState(false);

    const fetchAndSetProfile = async (userId: string) => {
        console.log('📂 Fetching profile for user:', userId);
        try {
            // Create a timeout promise that rejects after 5 seconds
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Profile fetch timed out')), 5000);
            });

            // Race the profile fetch against the timeout
            const response = await Promise.race([
                getUserProfile(userId),
                timeoutPromise
            ]) as any;

            console.log('📋 Profile response:', response);

            if (response.success) {
                if (response.profile) {
                    console.log('✅ Profile loaded:', response.profile);
                    setProfile(response.profile);
                } else {
                    console.log('⚠️ No profile found for user');
                    setProfile(null);
                }
            } else {
                console.error('❌ Failed to load profile:', response.error);
                setProfile(null);
            }
        } catch (err) {
            console.error('❌ Error fetching profile:', err);
            // Don't set profile to null here if we want to retry? 
            // Better to allow UI to show something than hang forever.
            setProfile(null);
        } finally {
            setProfileLoaded(true);
        }
    };

    const refreshProfile = async () => {
        if (!user) return;
        await fetchAndSetProfile(user.id);
    };

    useEffect(() => {
        let mounted = true;

        // Get initial session
        const initializeAuth = async () => {
            try {
                console.log('🔄 Initializing auth...');
                const { data: { session } } = await supabase.auth.getSession();
                console.log('📋 Session:', session ? 'Found' : 'Not found', session?.user?.id);

                if (session?.user && mounted) {
                    setUser(session.user);
                    await fetchAndSetProfile(session.user.id);
                } else {
                    console.log('❌ No session found');
                    setProfileLoaded(true);
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                setProfileLoaded(true);
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        };

        initializeAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session?.user?.id);

                if (session?.user && mounted) {
                    setUser(session.user);
                    await fetchAndSetProfile(session.user.id);
                } else if (mounted) {
                    setUser(null);
                    setProfile(null);
                }

                if (mounted) {
                    setIsLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const handleSignOut = async () => {
        try {
            console.log('🚪 Signing out...');
            await supabase.auth.signOut();
            setUser(null);
            setProfile(null);
            console.log('✅ Signed out, redirecting to home...');
            window.location.href = '/';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    // Debug log on state changes
    useEffect(() => {
        console.log('🔍 AuthContext state:', {
            hasUser: !!user,
            hasProfile: !!profile,
            role: profile?.role,
            verified: profile?.verified,
            isLoading,
            profileLoaded
        });
    }, [user, profile, isLoading, profileLoaded]);

    const value: AuthContextType = {
        user,
        profile,
        role: profile?.role || null,
        isLoading: isLoading || !profileLoaded, // Keep loading until profile is loaded
        isAuthenticated: !!user,
        signOut: handleSignOut,
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
