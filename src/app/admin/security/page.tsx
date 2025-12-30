"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Shield,
    Lock,
    AlertTriangle,
    CheckCircle2,
    Globe,
    Cpu,
    Eye,
    Activity
} from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Shield className="h-8 w-8" />
                    Security Center
                </h1>
                <p className="text-emerald-100/60 mt-1">System health monitoring and threat detection</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-emerald-500/10">
                                <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Healthy</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-white">System Status</h3>
                        <p className="text-emerald-100/60 mt-1">All services operational</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                                <Shield className="h-6 w-6 text-blue-400" />
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Active</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Firewall</h3>
                        <p className="text-emerald-100/60 mt-1">2,401 threats blocked today</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Lock className="h-6 w-6 text-purple-400" />
                            </div>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Encrypted</Badge>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Data Encryption</h3>
                        <p className="text-emerald-100/60 mt-1">AES-256 enabled globally</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Security Events */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Activity className="h-5 w-5" />
                            Recent Security Events
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { title: "Failed Login Attempt", ip: "192.168.1.45", time: "2 mins ago", severity: "medium" },
                            { title: "New Admin Login", ip: "10.0.0.12", time: "1 hour ago", severity: "low" },
                            { title: "API Rate Limit Exceeded", ip: "172.16.0.5", time: "3 hours ago", severity: "high" },
                        ].map((event, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/10">
                                <div className="flex items-center gap-3">
                                    <div className={`
                    h-2 w-2 rounded-full 
                    ${event.severity === 'high' ? 'bg-red-500' : event.severity === 'medium' ? 'bg-yellow-500' : 'bg-emerald-500'}
                  `} />
                                    <div>
                                        <p className="font-medium text-white">{event.title}</p>
                                        <p className="text-xs text-emerald-100/40">IP: {event.ip}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-emerald-100/60">{event.time}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Global Access Map Placeholder */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            Global Access Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[200px] flex items-center justify-center relative overflow-hidden bg-emerald-950/20 rounded-lg">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent animate-pulse" />
                        <Globe className="h-20 w-20 text-emerald-500/20" />
                        <p className="absolute bottom-4 text-emerald-100/40 text-sm">Monitoring global node connections</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
