"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Pill, Calendar, FileText, TrendingUp, Heart, Droplet, Zap } from "lucide-react";

export default function PatientDashboard() {
    return (
        <div className="space-y-6">
            {/* Welcome Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Welcome back, Amit!</h1>
                <p className="text-emerald-100/60 mt-1">Here's your health overview</p>
            </div>

            {/* Health Score Card */}
            <Card className="bg-gradient-to-br from-emerald-950/40 to-emerald-900/20 backdrop-blur-xl border-emerald-500/30">
                <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100/60 text-sm mb-1">Health Score</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-5xl font-bold text-white">78</h2>
                                <span className="text-emerald-400 text-lg">/100</span>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <TrendingUp className="h-4 w-4 text-emerald-400" />
                                <span className="text-sm text-emerald-400">+5 from last week</span>
                            </div>
                        </div>
                        <div className="h-24 w-24 rounded-full bg-emerald-500/20 flex items-center justify-center">
                            <Activity className="h-12 w-12 text-emerald-400" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-red-500/20">
                                <Heart className="h-5 w-5 text-red-400" />
                            </div>
                            <div>
                                <p className="text-xs text-emerald-100/40">Heart Rate</p>
                                <p className="text-xl font-bold text-white">72 bpm</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/20">
                                <Droplet className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs text-emerald-100/40">Blood Pressure</p>
                                <p className="text-xl font-bold text-white">120/80</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-emerald-500/20">
                                <Zap className="h-5 w-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-emerald-100/40">Adherence Streak</p>
                                <p className="text-xl font-bold text-white">12 days</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Active Prescriptions */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center gap-2">
                            <Pill className="h-5 w-5" />
                            Active Prescriptions
                        </CardTitle>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">1 Active</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="font-semibold text-white">ASA-9921</p>
                                <p className="text-sm text-emerald-100/60">Dr. Sharma</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-emerald-100/60">Metformin</span>
                                <span className="text-white">500mg • Twice daily</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-emerald-100/60">Lisinopril</span>
                                <span className="text-white">10mg • Once daily</span>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-emerald-500/10 flex items-center justify-between">
                            <span className="text-xs text-emerald-100/40">Issued: 12/28/2024</span>
                            <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400">
                                Tap to Reveal QR
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Upcoming Appointments
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <Activity className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Dr. Priya Sharma</p>
                                    <p className="text-sm text-emerald-100/60">General Checkup</p>
                                    <p className="text-xs text-emerald-100/40 mt-1">Monday, Dec 30 • 11:00 AM</p>
                                </div>
                            </div>
                            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Scheduled</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button className="h-auto p-4 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 text-white justify-start">
                    <FileText className="h-5 w-5 mr-3 text-emerald-400" />
                    <div className="text-left">
                        <p className="font-semibold">View Health Records</p>
                        <p className="text-xs text-emerald-100/60">Access your medical history</p>
                    </div>
                </Button>
                <Button className="h-auto p-4 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 text-white justify-start">
                    <Pill className="h-5 w-5 mr-3 text-emerald-400" />
                    <div className="text-left">
                        <p className="font-semibold">Medication Reminders</p>
                        <p className="text-xs text-emerald-100/60">Never miss a dose</p>
                    </div>
                </Button>
            </div>
        </div>
    );
}
