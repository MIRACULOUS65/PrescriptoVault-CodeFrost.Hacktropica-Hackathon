"use client";

import { Navigation } from '@/components/shared/Navigation';
import SyntheticHero from '@/components/ui/synthetic-hero';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LandingPage() {
  const { isAuthenticated, role, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to their portal
    if (!isLoading && isAuthenticated && role) {
      console.log('🔐 User already authenticated, redirecting to portal:', role);
      router.push(`/${role}`);
    }
  }, [isAuthenticated, role, isLoading, router]);

  // Don't block rendering - let the page show while auth is loading
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <SyntheticHero
        title="PrescriptoVault"
        description="Secure. Immutable. Decentralized. The future of medical prescriptions powered by Algorand."
        badgeText="Powered by Algorand"
        badgeLabel="Mainnet-Ready"
        ctaButtons={[
          {
            text: "Enter Portal",
            href: "/sign-in",
            primary: true,
          },
          {
            text: "View Documentation",
            href: "#docs",
            primary: false
          }
        ]}
        microDetails={[
          "AES-256 Encryption",
          "Real-time Validator Node",
        ]}
      />
    </main>
  );
}
