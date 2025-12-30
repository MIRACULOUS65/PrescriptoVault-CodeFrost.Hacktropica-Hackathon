'use client';

import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    UserPlus,
    FileEdit,
    Coins,
    Smartphone,
    QrCode,
    CheckCircle2,
    Pill,
    XCircle,
    Shield,
    Activity,
    Lock
} from 'lucide-react';

export function WorkflowSection() {
    const data = [
        {
            title: "Step 1",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <UserPlus className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        Doctor
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Doctor Registration</h3>
                                    <p className="text-emerald-100/60 text-sm">
                                        Doctor registers and verifies their Digital ID (DID) with license credentials.
                                        The system validates medical credentials against national databases.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-4">
                                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-3">
                                    <Shield className="h-4 w-4 text-emerald-400 mb-1" />
                                    <p className="text-xs text-emerald-100/60">Verified Identity</p>
                                </div>
                                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-3">
                                    <Lock className="h-4 w-4 text-emerald-400 mb-1" />
                                    <p className="text-xs text-emerald-100/60">Encrypted Data</p>
                                </div>
                                <div className="bg-emerald-950/30 border border-emerald-500/20 rounded-lg p-3">
                                    <Activity className="h-4 w-4 text-emerald-400 mb-1" />
                                    <p className="text-xs text-emerald-100/60">Live Status</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 2",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <FileEdit className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        Doctor
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Create Prescription</h3>
                                    <p className="text-emerald-100/60 text-sm mb-4">
                                        Using the AI-assisted writer, doctor creates a prescription with real-time drug interaction checks and dosage recommendations.
                                    </p>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                            AI-powered drug suggestions
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                            Automatic interaction warnings
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-emerald-100/60">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                                            Patient history integration
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 3",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4 mb-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <Coins className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        System
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Mint to Blockchain</h3>
                                    <p className="text-emerald-100/60 text-sm mb-4">
                                        Prescription is cryptographically hashed and minted as a unique ASA token on the Algorand blockchain with immutable proof.
                                    </p>
                                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-3 font-mono text-xs text-emerald-400">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-emerald-100/40">Hash:</span>
                                            <span>0x7f9a...</span>
                                        </div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-emerald-100/40">Block:</span>
                                            <span>#24,891,234</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-emerald-100/40">Finality:</span>
                                            <span className="text-emerald-400">0.3s ✓</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 4",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <Smartphone className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        Patient
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Patient Receives Token</h3>
                                    <p className="text-emerald-100/60 text-sm">
                                        Patient receives instant notification and sees a new "Green Token" in their digital health wallet with prescription details.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 5",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <QrCode className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        Patient
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Generate QR Code</h3>
                                    <p className="text-emerald-100/60 text-sm mb-4">
                                        Patient generates a time-limited QR code (5 min expiry) for secure pharmacy redemption. Prevents screenshot fraud.
                                    </p>
                                    <div className="bg-emerald-950/20 border border-emerald-500/20 rounded-lg p-4 text-center">
                                        <div className="w-24 h-24 mx-auto bg-white/10 border-2 border-emerald-500/30 rounded-lg flex items-center justify-center">
                                            <QrCode className="h-12 w-12 text-emerald-400" />
                                        </div>
                                        <p className="text-xs text-emerald-100/40 mt-2">Expires in 4:32</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 6",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        Pharmacist
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Pharmacy Verification</h3>
                                    <p className="text-emerald-100/60 text-sm">
                                        Pharmacist scans QR code. System instantly verifies token authenticity against the Algorand ledger in real-time.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 7",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <Pill className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        Pharmacist
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Dispense Medication</h3>
                                    <p className="text-emerald-100/60 text-sm">
                                        Upon successful verification, pharmacist dispenses medication and marks the prescription as fulfilled in the system.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
        {
            title: "Step 8",
            content: (
                <div>
                    <Card className="bg-black/40 backdrop-blur-md border-emerald-500/20 mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30">
                                    <XCircle className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div>
                                    <Badge variant="outline" className="mb-2 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                        System
                                    </Badge>
                                    <h3 className="text-xl font-bold text-white mb-2">Token Burned</h3>
                                    <p className="text-emerald-100/60 text-sm mb-4">
                                        Token is permanently marked as SPENT on the blockchain. Patient cannot reuse the QR code at another pharmacy, preventing double-dispensing fraud.
                                    </p>
                                    <div className="flex items-center gap-2 text-xs">
                                        <div className="flex-1 h-1 bg-emerald-950/50 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-emerald-500 rounded-full"></div>
                                        </div>
                                        <span className="text-emerald-400 font-mono">COMPLETE</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full bg-black">
            <Timeline data={data} />
        </div>
    );
}
