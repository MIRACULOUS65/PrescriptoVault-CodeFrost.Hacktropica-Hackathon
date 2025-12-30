import { Navigation } from '@/components/shared/Navigation';
import { Footer } from '@/components/shared/Footer';
import { WorkflowSection } from '@/components/landing/WorkflowSection';

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navigation />
            <div className="pt-20">
                <WorkflowSection />
            </div>
            <Footer />
        </main>
    );
}
