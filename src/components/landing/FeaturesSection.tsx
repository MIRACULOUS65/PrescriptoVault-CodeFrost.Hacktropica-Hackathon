"use client";

import * as React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BentoGridShowcase } from "@/components/ui/bento-product-features";
import {
    Settings2,
    Command,
    Plus,
    Network,
    ShieldCheck,
    Activity,
    Zap,
    Lock,
    FileCheck
} from "lucide-react";

// --- Helper Components for the Demo ---


const IntegrationCard = () => {
    const [isEnabled, setIsEnabled] = React.useState(true);
    const [isConfiguring, setIsConfiguring] = React.useState(false);

    const handleConfigure = () => {
        setIsConfiguring(true);
        // Simulate configuration action
        setTimeout(() => {
            setIsConfiguring(false);
            alert('EHR Integration settings opened. (Demo mode)');
        }, 500);
    };

    const handleToggle = (checked: boolean) => {
        setIsEnabled(checked);
        // Show feedback
        setTimeout(() => {
            alert(`EHR Integration ${checked ? 'enabled' : 'disabled'}`);
        }, 100);
    };

    return (
        <Card className="flex h-full flex-col border-emerald-500/20 bg-black/40 backdrop-blur-md">
            <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/30">
                    <Network className="h-6 w-6 text-emerald-400" />
                </div>
                <CardTitle className="text-white">EHR Integration</CardTitle>
                <CardDescription className="text-emerald-100/60">
                    Seamlessly connect with existing Electronic Health Records.
                    Sync patient history, allergies, and interactions in real-time
                    secured by blockchain verification.
                </CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto flex items-center justify-between">
                <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/50 hover:text-emerald-300"
                    onClick={handleConfigure}
                    disabled={isConfiguring}
                >
                    <Settings2 className="mr-2 h-4 w-4" />
                    {isConfiguring ? 'Opening...' : 'Configure'}
                </Button>
                <Switch
                    className="data-[state=checked]:bg-emerald-500"
                    aria-label="Toggle integration"
                    checked={isEnabled}
                    onCheckedChange={handleToggle}
                />
            </CardFooter>
        </Card>
    );
};

const TrackersCard = () => (
    <Card className="h-full border-emerald-500/20 bg-black/40 backdrop-blur-md">
        <CardContent className="flex h-full flex-col justify-between p-6">
            <div>
                <CardTitle className="text-base font-medium text-white">
                    Active Validators
                </CardTitle>
                <CardDescription className="text-emerald-100/60">12 Verified Nodes</CardDescription>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-black bg-emerald-900/80 border border-emerald-500/30">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
);

const FocusCard = () => (
    <Card className="h-full border-emerald-500/20 bg-black/40 backdrop-blur-md">
        <CardContent className="flex h-full flex-col justify-between p-6">
            <div className="flex items-start justify-between">
                <div>
                    <CardTitle className="text-base font-medium text-white">Validation</CardTitle>
                    <CardDescription className="text-emerald-100/60">Network Up-time</CardDescription>
                </div>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                    Live
                </Badge>
            </div>
            <div>
                <span className="text-5xl font-bold text-white">99.9%</span>
            </div>
            <div className="flex justify-between text-xs text-emerald-100/40">
                <span>Epoch 241</span>
                <span>Algorand Mainnet</span>
            </div>
        </CardContent>
    </Card>
);

const StatisticCard = () => (
    <Card className="relative h-full w-full overflow-hidden border-emerald-500/20 bg-emerald-950/10 backdrop-blur-md">
        {/* Dotted background */}
        <div
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: "radial-gradient(rgba(16, 185, 129, 0.5) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
            }}
        />
        <CardContent className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center">
            <Zap className="h-8 w-8 text-emerald-400 mb-2" />
            <span className="text-6xl font-bold text-white tracking-tighter">0.3s</span>
            <span className="text-sm text-emerald-100/60 font-medium">Finality Time</span>
        </CardContent>
    </Card>
);

const ProductivityCard = () => (
    <Card className="h-full border-emerald-500/20 bg-black/40 backdrop-blur-md">
        <CardContent className="flex h-full flex-col justify-end p-6">
            <div className="mb-4 p-2 w-fit rounded-lg bg-emerald-500/10">
                <Lock className="h-6 w-6 text-emerald-400" />
            </div>
            <CardTitle className="text-base font-medium text-white">
                AES-256 Encryption
            </CardTitle>
            <CardDescription className="text-emerald-100/60 mt-1">
                Military-grade encryption for all patient data stored off-chain.
            </CardDescription>
        </CardContent>
    </Card>
);

const ShortcutsCard = () => (
    <Card className="h-full border-emerald-500/20 bg-black/40 backdrop-blur-md">
        <CardContent className="flex h-full flex-wrap items-center justify-between gap-4 p-6">
            <div>
                <CardTitle className="text-base font-medium text-white">Quick Minting</CardTitle>
                <CardDescription className="text-emerald-100/60">
                    Generate prescription tokens instantly.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                {/* Styled div replacing Kbd */}
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-950/30 font-mono text-xs font-medium text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <Command className="h-3 w-3" />
                </div>
                <Plus className="h-3 w-3 text-emerald-500/50" />
                {/* Styled div replacing Kbd */}
                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-emerald-500/30 bg-emerald-950/30 font-mono text-xs font-medium text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    P
                </div>
            </div>
        </CardContent>
    </Card>
);

// --- The Demo ---
export default function FeaturesSection() {
    return (
        <section className="min-h-screen bg-black py-24 relative overflow-hidden">
            {/* Background glow effects */}
            <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 relative z-10">
                <div className="mb-16 max-w-2xl mx-auto text-center">
                    <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-950/10 backdrop-blur-sm">
                        System Capabilities
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
                        Everything You Need for <span className="text-emerald-400">Secure</span> Prescriptions
                    </h2>
                    <p className="text-lg text-emerald-100/60 leading-relaxed">
                        From AI-assisted writing to blockchain verification, PrescriptoVault covers the entire
                        prescription lifecycle with security at every step.
                    </p>
                </div>

                <BentoGridShowcase
                    integration={<IntegrationCard />}
                    trackers={<TrackersCard />}
                    statistic={<StatisticCard />}
                    focus={<FocusCard />}
                    productivity={<ProductivityCard />}
                    shortcuts={<ShortcutsCard />}
                />
            </div>
        </section>
    );
}
