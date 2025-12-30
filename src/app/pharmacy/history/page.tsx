"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History, Calendar, User, Pill } from "lucide-react";

const mockHistory = [
    {
        id: "ASA-9921",
        patient: "Amit Patel",
        doctor: "Dr. Priya Sharma",
        date: "2024-12-30",
        time: "10:30 AM",
        medications: ["Metformin 500mg", "Lisinopril 10mg"],
        status: "dispensed"
    },
    {
        id: "ASA-9920",
        patient: "Priya Singh",
        doctor: "Dr. Rajesh Kumar",
        date: "2024-12-30",
        time: "09:15 AM",
        medications: ["Amoxicillin 250mg"],
        status: "dispensed"
    },
    {
        id: "ASA-9919",
        patient: "Rahul Verma",
        doctor: "Dr. Priya Sharma",
        date: "2024-12-29",
        time: "04:45 PM",
        medications: ["Atorvastatin 20mg", "Aspirin 75mg"],
        status: "dispensed"
    },
    {
        id: "ASA-9918",
        patient: "Sneha Patel",
        doctor: "Dr. Anil Mehta",
        date: "2024-12-29",
        time: "02:20 PM",
        medications: ["Omeprazole 20mg"],
        status: "dispensed"
    }
];

export default function HistoryPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <History className="h-8 w-8" />
                    Dispensed History
                </h1>
                <p className="text-emerald-100/60 mt-1">View all verified and dispensed prescriptions</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-4">
                        <p className="text-emerald-100/60 text-sm">Today</p>
                        <p className="text-3xl font-bold text-white">12</p>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-4">
                        <p className="text-emerald-100/60 text-sm">This Week</p>
                        <p className="text-3xl font-bold text-white">87</p>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-4">
                        <p className="text-emerald-100/60 text-sm">This Month</p>
                        <p className="text-3xl font-bold text-white">342</p>
                    </CardContent>
                </Card>
            </div>

            {/* History List */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Recent Dispensations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {mockHistory.map((record) => (
                        <div key={record.id} className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-white text-lg">{record.id}</p>
                                    <div className="flex items-center gap-4 mt-1">
                                        <div className="flex items-center gap-1 text-sm text-emerald-100/60">
                                            <User className="h-3 w-3" />
                                            {record.patient}
                                        </div>
                                        <div className="flex items-center gap-1 text-sm text-emerald-100/60">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(record.date).toLocaleDateString()} • {record.time}
                                        </div>
                                    </div>
                                </div>
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                    {record.status}
                                </Badge>
                            </div>

                            <div className="space-y-2">
                                <p className="text-xs text-emerald-100/40">Prescriber: {record.doctor}</p>
                                <div className="flex items-start gap-2">
                                    <Pill className="h-4 w-4 text-emerald-400 mt-0.5" />
                                    <div className="flex flex-wrap gap-2">
                                        {record.medications.map((med, idx) => (
                                            <Badge key={idx} variant="outline" className="border-emerald-500/20 text-emerald-100/80">
                                                {med}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-3 pt-3 border-t border-emerald-500/10">
                                <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400">
                                    View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
