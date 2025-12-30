"use client";

import { Navigation } from '@/components/shared/Navigation';
import SyntheticHero from '@/components/ui/synthetic-hero';
import FeaturesSection from '@/components/landing/FeaturesSection';

export default function LandingPage() {
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

      <FeaturesSection />
    </main>
  );
}
