"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScanLine, Keyboard, CheckCircle2, User, Stethoscope, Pill } from "lucide-react";

interface VerificationResult {
    verified: boolean;
    prescription?: {
        id: string;
        patient: string;
        doctor: string;
        medications: { name: string; dosage: string; frequency: string; duration: string; quantity: number }[];
    };
}

const quickDemoTokens = ["ASA-9921", "ASA-9920", "ASA-9919"];

export default function VerifyPage() {
    const [tokenId, setTokenId] = useState("");
    const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
    const [isVerifying, setIsVerifying] = useState(false);

    const handleVerify = async (id: string) => {
        setIsVerifying(true);
        setTokenId(id);

        // Simulate verification delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock verification - in real app, this would call blockchain
        if (id === "ASA-9921") {
            setVerificationResult({
                verified: true,
                prescription: {
                    id: "ASA-9921",
                    patient: "Amit Patel",
                    doctor: "Dr. Priya Sharma",
                    medications: [
                        { name: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "30 days", quantity: 60 },
                        { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", duration: "30 days", quantity: 30 }
                    ]
                }
            });
        } else if (id === "ASA-9920" || id === "ASA-9919") {
            setVerificationResult({
                verified: true,
                prescription: {
                    id,
                    patient: "Sample Patient",
                    doctor: "Dr. Sample",
                    medications: [
                        { name: "Sample Drug", dosage: "100mg", frequency: "Once daily", duration: "14 days", quantity: 14 }
                    ]
                }
            });
        } else {
            setVerificationResult({ verified: false });
        }

        setIsVerifying(false);
    };

    const handleDispense = () => {
        alert("Prescription dispensed successfully!");
        setVerificationResult(null);
        setTokenId("");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Verify Prescription</h1>
                <p className="text-emerald-100/60 mt-1">Scan or enter prescription token to verify authenticity</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Scan Prescription Card */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white">Scan Prescription</CardTitle>
                        <p className="text-sm text-emerald-100/60">Enter the patient's token ID or scan their QR code to verify.</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Tabs */}
                        <Tabs defaultValue="manual" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 bg-emerald-950/30">
                                <TabsTrigger value="manual" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                                    <Keyboard className="h-4 w-4 mr-2" />
                                    Manual Entry
                                </TabsTrigger>
                                <TabsTrigger value="camera" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                                    <ScanLine className="h-4 w-4 mr-2" />
                                    Camera Scan
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="manual" className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-emerald-100/80">Token ID / Asset ID</label>
                                    <div className="flex gap-2">
                                        <Input
                                            value={tokenId}
                                            onChange={(e) => setTokenId(e.target.value)}
                                            placeholder="ASA-9921"
                                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        />
                                        <Button
                                            onClick={() => handleVerify(tokenId)}
                                            disabled={!tokenId || isVerifying}
                                            className="bg-white hover:bg-emerald-50 text-black px-6"
                                        >
                                            {isVerifying ? "Verifying..." : "Verify"}
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs text-emerald-100/60">Quick Demo Tokens</p>
                                    <div className="flex flex-wrap gap-2">
                                        {quickDemoTokens.map((token) => (
                                            <Button
                                                key={token}
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleVerify(token)}
                                                className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30"
                                            >
                                                {token}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="camera" className="mt-4">
                                <div className="p-8 rounded-lg bg-emerald-950/20 border-2 border-dashed border-emerald-500/30 flex flex-col items-center justify-center">
                                    <ScanLine className="h-12 w-12 text-emerald-400 mb-3" />
                                    <p className="text-emerald-100/60 text-sm">Camera scanning coming soon</p>
                                    <p className="text-emerald-100/40 text-xs mt-1">Use manual entry for now</p>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Verification Result Card */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white">Verification Result</CardTitle>
                        <p className="text-sm text-emerald-100/60">Token verification status and prescription details.</p>
                    </CardHeader>
                    <CardContent>
                        {!verificationResult ? (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="h-16 w-16 rounded-full bg-emerald-950/30 flex items-center justify-center mb-4">
                                    <ScanLine className="h-8 w-8 text-emerald-400/40" />
                                </div>
                                <p className="text-emerald-100/40">No verification yet</p>
                                <p className="text-xs text-emerald-100/30 mt-1">Enter a token ID to verify</p>
                            </div>
                        ) : verificationResult.verified ? (
                            <div className="space-y-6">
                                {/* Verified Badge */}
                                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-950/50 to-emerald-900/30 border border-emerald-500/30">
                                    <div className="flex flex-col items-center text-center">
                                        <div className="h-16 w-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                                            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-emerald-400">VERIFIED</h3>
                                        <p className="text-sm text-emerald-100/60 mt-1">✓ Token verified successfully. Ready for dispensing.</p>
                                    </div>
                                </div>

                                {/* Patient & Prescriber Info */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 text-emerald-100/60 text-xs mb-1">
                                            <User className="h-3 w-3" />
                                            Patient
                                        </div>
                                        <p className="font-semibold text-white">{verificationResult.prescription?.patient}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 text-emerald-100/60 text-xs mb-1">
                                            <Stethoscope className="h-3 w-3" />
                                            Prescriber
                                        </div>
                                        <p className="font-semibold text-white">{verificationResult.prescription?.doctor}</p>
                                    </div>
                                </div>

                                {/* Medications */}
                                <div>
                                    <div className="flex items-center gap-2 text-white font-semibold mb-3">
                                        <Pill className="h-4 w-4" />
                                        Medications to Dispense
                                    </div>
                                    <div className="space-y-3">
                                        {verificationResult.prescription?.medications.map((med, idx) => (
                                            <div key={idx} className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                                <div className="flex items-start justify-between mb-2">
                                                    <p className="font-semibold text-white">{med.name}</p>
                                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                                        Qty: {med.quantity}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-emerald-100/60">{med.dosage} • {med.frequency} • {med.duration}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dispense Button */}
                                <Button
                                    onClick={handleDispense}
                                    className="w-full bg-white hover:bg-emerald-50 text-black font-semibold py-6"
                                >
                                    <CheckCircle2 className="h-5 w-5 mr-2" />
                                    Confirm & Dispense
                                </Button>
                            </div>
                        ) : (
                            <div className="p-12 flex flex-col items-center justify-center text-center">
                                <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                                    <ScanLine className="h-8 w-8 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-red-400 mb-2">INVALID TOKEN</h3>
                                <p className="text-sm text-emerald-100/60">This prescription token could not be verified.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
