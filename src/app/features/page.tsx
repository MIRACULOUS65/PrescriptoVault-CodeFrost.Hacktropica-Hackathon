import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import FeaturesSection from '@/components/landing/FeaturesSection';
import { NetworkStats } from '@/components/landing/NetworkStats';

export default function FeaturesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />
            <div className="pt-20">
                <FeaturesSection />
                <NetworkStats />
            </div>
            <Footer />
        </main>
    );
}
