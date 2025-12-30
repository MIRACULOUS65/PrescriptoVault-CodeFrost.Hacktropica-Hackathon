"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Activity } from "lucide-react";

export default function AnalyticsPage() {
    return (
        <div className="h-[80vh] flex flex-col items-center justify-center p-8 bg-black">
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                        <Activity className="h-24 w-24 text-emerald-400 relative z-10" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-white">Advanced Analytics</h1>
                    <p className="text-emerald-100/60">
                        Deep insights into platform usage, prescription trends, and user growth are currently being built.
                    </p>
                </div>

                <Card className="bg-emerald-950/20 border-emerald-500/20">
                    <CardContent className="p-4">
                        <p className="text-sm font-mono text-emerald-400">Status: Construction in progress</p>
                        <div className="w-full h-1 bg-emerald-950 mt-2 rounded-full overflow-hidden">
                            <div className="h-full w-1/3 bg-emerald-500 animate-loading-bar" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
