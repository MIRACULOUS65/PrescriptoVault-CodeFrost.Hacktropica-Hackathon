"use client";

import React, { useEffect } from "react";
import { Sidebar, UserRole } from "./Sidebar";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface DashboardLayoutProps {
    role: UserRole;
    children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
    const { isAuthenticated, role: userRole, isLoading, profile } = useAuth();

    useEffect(() => {
        console.log('🔍 DashboardLayout auth check:', { isLoading, isAuthenticated, userRole, expectedRole: role, verified: profile?.verified });

        // Redirect if not authenticated
        if (!isLoading && !isAuthenticated) {
            console.log('❌ Not authenticated, redirecting to sign-in');
            window.location.href = '/sign-in';
            return;
        }

        // Redirect if not verified
        if (!isLoading && isAuthenticated && profile && !profile.verified) {
            console.log('⚠️ Not verified, redirecting to wallet verification');
            window.location.href = '/verify-wallet';
            return;
        }

        // Redirect if wrong role
        if (!isLoading && isAuthenticated && userRole && userRole !== role) {
            console.log('⚠️ Wrong role, redirecting to correct portal:', userRole);
            window.location.href = `/${userRole}`;
            return;
        }
    }, [isLoading, isAuthenticated, userRole, role, profile]);

    // Show loading while checking auth
    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar role={role} />
            <main className="flex-1 overflow-auto">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
