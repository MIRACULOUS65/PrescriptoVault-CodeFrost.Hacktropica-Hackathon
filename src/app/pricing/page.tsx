import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { PricingSection } from '@/components/landing/PricingSection';

export default function PricingPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />
            <div className="pt-20">
                <PricingSection />
            </div>
            <Footer />
        </main>
    );
}
