"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Calendar, Clock, Copy, Shield, Eye } from "lucide-react";
import QRCode from "react-qr-code";

interface Prescription {
    id: string;
    assetId: string;
    doctor: string;
    medications: { name: string; dosage: string; frequency: string }[];
    issuedDate: string;
    status: "active" | "dispensed" | "expired";
}

const mockPrescriptions: Prescription[] = [
    {
        id: "ASA-9921",
        assetId: "ASA-9921",
        doctor: "Dr. Sharma",
        medications: [
            { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
            { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" }
        ],
        issuedDate: "12/28/2024",
        status: "active"
    },
    {
        id: "ASA-8812",
        assetId: "ASA-8812",
        doctor: "Dr. Kumar",
        medications: [
            { name: "Amoxicillin", dosage: "250mg", frequency: "Three times daily" }
        ],
        issuedDate: "12/15/2024",
        status: "dispensed"
    }
];

export default function VaultPage() {
    const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
    const [qrExpiry, setQrExpiry] = useState(300); // 5 minutes in seconds

    const activePrescriptions = mockPrescriptions.filter(p => p.status === "active");
    const historyPrescriptions = mockPrescriptions.filter(p => p.status !== "active");

    const handleRevealQR = (prescription: Prescription) => {
        setSelectedPrescription(prescription);
        setQrExpiry(300);

        // Start countdown
        const interval = setInterval(() => {
            setQrExpiry(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setSelectedPrescription(null);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Wallet className="h-8 w-8" />
                        Health Vault
                    </h1>
                    <p className="text-emerald-100/60 mt-1">Welcome, Amit Patel</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs text-emerald-100/40 uppercase tracking-wider">Health Score</p>
                            <p className="text-4xl font-bold text-white">78</p>
                        </div>
                        <div className="h-14 w-14 rounded-full bg-emerald-500/20 border-2 border-emerald-500/40 flex items-center justify-center">
                            <Shield className="h-7 w-7 text-emerald-400" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-xs text-emerald-100/40">12 day streak</p>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 text-xs mt-1">
                                Privacy
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="active" className="w-full">
                <TabsList className="bg-black/40 border border-emerald-500/20">
                    <TabsTrigger value="active" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                        Active
                        <Badge className="ml-2 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                            {activePrescriptions.length}
                        </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                        History
                    </TabsTrigger>
                    <TabsTrigger value="reminders" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                        Reminders
                    </TabsTrigger>
                </TabsList>

                {/* Active Prescriptions */}
                <TabsContent value="active" className="space-y-4 mt-6">
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">Active Prescriptions</h2>
                        <p className="text-sm text-emerald-100/60">Your available prescription tokens. Tap to reveal QR code for pharmacy.</p>
                    </div>

                    {activePrescriptions.map((prescription) => (
                        <Card key={prescription.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-emerald-500/20">
                                            <Shield className="h-5 w-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white text-lg">{prescription.id}</p>
                                            <p className="text-sm text-emerald-100/60">{prescription.doctor}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                        {prescription.status}
                                    </Badge>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {prescription.medications.map((med, idx) => (
                                        <div key={idx} className="flex items-center justify-between text-sm">
                                            <span className="font-medium text-white">{med.name}</span>
                                            <span className="text-emerald-100/60">{med.dosage} • {med.frequency}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-emerald-500/10">
                                    <div className="flex items-center gap-2 text-xs text-emerald-100/40">
                                        <Calendar className="h-3 w-3" />
                                        {prescription.issuedDate}
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30"
                                        onClick={() => handleRevealQR(prescription)}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        Tap to Reveal QR
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* History */}
                <TabsContent value="history" className="space-y-4 mt-6">
                    {historyPrescriptions.map((prescription) => (
                        <Card key={prescription.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20 opacity-60">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-white">{prescription.id}</p>
                                        <p className="text-sm text-emerald-100/60">{prescription.doctor}</p>
                                        <p className="text-xs text-emerald-100/40 mt-1">{prescription.issuedDate}</p>
                                    </div>
                                    <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">
                                        {prescription.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </TabsContent>

                {/* Reminders */}
                <TabsContent value="reminders" className="mt-6">
                    <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardContent className="p-8 text-center">
                            <p className="text-emerald-100/60">No reminders set</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* QR Code Dialog */}
            <Dialog open={!!selectedPrescription} onOpenChange={() => setSelectedPrescription(null)}>
                <DialogContent className="bg-black border-emerald-500/20 text-white max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center">Scan at Pharmacy</DialogTitle>
                    </DialogHeader>

                    {selectedPrescription && (
                        <div className="space-y-6">
                            {/* QR Code */}
                            <div className="flex justify-center p-6 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
                                <QRCode
                                    value={selectedPrescription.assetId}
                                    size={256}
                                    level="H"
                                    fgColor="#10b981"
                                    bgColor="#022c22"
                                />
                            </div>

                            {/* Expiry Timer */}
                            <div className="flex items-center justify-center gap-2 text-emerald-100/60">
                                <Clock className="h-4 w-4" />
                                <span>Expires in {formatTime(qrExpiry)}</span>
                            </div>

                            {/* Asset ID */}
                            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-white">{selectedPrescription.assetId}</span>
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => copyToClipboard(selectedPrescription.assetId)}
                                        className="text-emerald-400 hover:text-emerald-300"
                                    >
                                        <Copy className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Instructions */}
                            <p className="text-sm text-center text-emerald-100/60">
                                Show this QR code to the pharmacist. It will expire automatically for your security.
                            </p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
