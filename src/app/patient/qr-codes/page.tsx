"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Calendar } from "lucide-react";
import QRCode from "react-qr-code";

const mockPrescriptions = [
    { id: "ASA-9921", doctor: "Dr. Sharma", date: "12/28/2024", status: "active" },
    { id: "ASA-8812", doctor: "Dr. Kumar", date: "12/15/2024", status: "dispensed" },
    { id: "ASA-7703", doctor: "Dr. Patel", date: "11/30/2024", status: "expired" }
];

export default function QRCodesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <QrCode className="h-8 w-8" />
                    QR Codes
                </h1>
                <p className="text-emerald-100/60 mt-1">Quick access to all your prescription QR codes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPrescriptions.map((prescription) => (
                    <Card key={prescription.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="font-semibold text-white">{prescription.id}</p>
                                    <p className="text-sm text-emerald-100/60">{prescription.doctor}</p>
                                </div>
                                <Badge className={
                                    prescription.status === "active"
                                        ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                        : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                                }>
                                    {prescription.status}
                                </Badge>
                            </div>

                            {prescription.status === "active" ? (
                                <div className="flex justify-center p-4 bg-emerald-950/30 rounded-xl border border-emerald-500/20">
                                    <QRCode
                                        value={prescription.id}
                                        size={200}
                                        level="H"
                                        fgColor="#10b981"
                                        bgColor="#022c22"
                                    />
                                </div>
                            ) : (
                                <div className="p-4 bg-emerald-950/20 rounded-xl flex items-center justify-center h-[200px]">
                                    <p className="text-emerald-100/40 text-sm">QR Code Expired</p>
                                </div>
                            )}

                            <div className="flex items-center gap-2 text-xs text-emerald-100/40">
                                <Calendar className="h-3 w-3" />
                                Issued: {prescription.date}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
