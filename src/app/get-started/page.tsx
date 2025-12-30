"use client";

import { SignInFlow } from "@/components/ui/sign-in-flow";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GetStartedPage() {
    const { isAuthenticated, role, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect authenticated users to their portal
        if (!isLoading && isAuthenticated && role) {
            console.log('🔐 User already authenticated, redirecting to portal:', role);
            router.push(`/${role}`);
        }
    }, [isAuthenticated, role, isLoading, router]);

    // Don't block rendering - just show sign-in and redirect will happen if needed
    return <SignInFlow mode="signup" />;
}
