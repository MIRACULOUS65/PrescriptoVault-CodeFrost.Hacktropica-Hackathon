"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Activity, Droplet, Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RecordsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <FileText className="h-8 w-8" />
                    Health Records
                </h1>
                <p className="text-emerald-100/60 mt-1">Your complete medical history</p>
            </div>

            {/* Vital Signs */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        Latest Vital Signs
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Heart className="h-5 w-5 text-red-400" />
                            <span className="text-sm text-emerald-100/60">Heart Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-white">72 bpm</p>
                        <p className="text-xs text-emerald-100/40 mt-1">Normal range</p>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Droplet className="h-5 w-5 text-blue-400" />
                            <span className="text-sm text-emerald-100/60">Blood Pressure</span>
                        </div>
                        <p className="text-2xl font-bold text-white">120/80</p>
                        <p className="text-xs text-emerald-100/40 mt-1">Normal range</p>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Activity className="h-5 w-5 text-emerald-400" />
                            <span className="text-sm text-emerald-100/60">Blood Sugar</span>
                        </div>
                        <p className="text-2xl font-bold text-white">95 mg/dL</p>
                        <p className="text-xs text-emerald-100/40 mt-1">Normal range</p>
                    </div>
                </CardContent>
            </Card>

            {/* Medical History */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Medical History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-white">Type 2 Diabetes</p>
                                <p className="text-sm text-emerald-100/60">Diagnosed: Jan 2020</p>
                            </div>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Chronic</Badge>
                        </div>
                        <p className="text-sm text-emerald-100/60">Managed with Metformin, regular monitoring required</p>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="font-semibold text-white">Hypertension</p>
                                <p className="text-sm text-emerald-100/60">Diagnosed: Mar 2021</p>
                            </div>
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Chronic</Badge>
                        </div>
                        <p className="text-sm text-emerald-100/60">Controlled with Lisinopril</p>
                    </div>
                </CardContent>
            </Card>

            {/* Test Results */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Recent Test Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-white">Complete Blood Count (CBC)</p>
                                <p className="text-sm text-emerald-100/60">Dec 20, 2024</p>
                                <p className="text-xs text-emerald-100/40 mt-1">Dr. Sharma</p>
                            </div>
                            <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="font-semibold text-white">HbA1c Test</p>
                                <p className="text-sm text-emerald-100/60">Dec 15, 2024</p>
                                <p className="text-xs text-emerald-100/40 mt-1">Dr. Sharma</p>
                            </div>
                            <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400">
                                <Download className="h-4 w-4 mr-2" />
                                Download
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Allergies */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Penicillin</Badge>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Peanuts</Badge>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
