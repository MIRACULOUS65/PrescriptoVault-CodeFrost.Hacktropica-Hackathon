"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Box, ArrowRight } from "lucide-react";

export default function BlockchainPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Database className="h-8 w-8" />
                    Blockchain Explorer
                </h1>
                <p className="text-emerald-100/60 mt-1">Monitor decentralized ledger activity</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Current Block", value: "#45892342" },
                    { label: "Gas Price", value: "12 gwei" },
                    { label: "Network Hashrate", value: "450 TH/s" },
                    { label: "Peers", value: "24" },
                ].map((stat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-center">
                        <p className="text-2xl font-mono font-bold text-white">{stat.value}</p>
                        <p className="text-xs text-emerald-100/40 uppercase tracking-wider mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Latest Blocks</h2>

                {[1, 2, 3, 4, 5].map((i) => (
                    <Card key={i} className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <Box className="h-5 w-5 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-mono font-bold text-white text-lg">Block #4589234{2 - i}</p>
                                    <p className="text-xs text-emerald-100/40">Mined by 0x8f...2910 • 12 secs ago</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <Badge variant="outline" className="border-emerald-500/20 text-emerald-400">
                                    {15 + i} Txns
                                </Badge>
                                <p className="text-xs text-emerald-100/40 mt-1">Size: 42.5 KB</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
