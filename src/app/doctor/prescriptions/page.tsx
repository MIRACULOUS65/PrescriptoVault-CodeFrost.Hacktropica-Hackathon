"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDoctorStore } from "@/lib/stores/doctorStore";
import { NewPrescriptionDialog } from "@/components/doctor/NewPrescriptionDialog";
import { Shield } from "lucide-react";

export default function PrescriptionsPage() {
    const prescriptions = useDoctorStore((state) => state.prescriptions);
    const patients = useDoctorStore((state) => state.patients);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Prescriptions</h1>
                    <p className="text-emerald-100/60 mt-1">Manage and create prescriptions</p>
                </div>
                <NewPrescriptionDialog />
            </div>

            <div className="space-y-4">
                {prescriptions.map((rx) => {
                    const patient = patients.find(p => p.id === rx.patientId);
                    return (
                        <Card key={rx.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-white flex items-center gap-2">
                                            {patient?.name || "Unknown Patient"}
                                            {rx.txHash && (
                                                <span title="Blockchain verified">
                                                    <Shield className="h-4 w-4 text-emerald-400" />
                                                </span>
                                            )}
                                        </CardTitle>
                                        <p className="text-sm text-emerald-100/60 mt-1">Prescription #{rx.id}</p>
                                    </div>
                                    <div className="text-right">
                                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                            {rx.status}
                                        </Badge>
                                        <p className="text-xs text-emerald-100/40 mt-1">{new Date(rx.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-100/80 mb-2">Medications</h4>
                                    <div className="space-y-2">
                                        {rx.drugs.map((med, idx) => (
                                            <div key={idx} className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <p className="font-medium text-white">{med.drugName}</p>
                                                        <p className="text-sm text-emerald-100/60">{med.dosage} - {med.frequency}</p>
                                                        {med.notes && <p className="text-xs text-emerald-100/40 mt-1">{med.notes}</p>}
                                                    </div>
                                                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                                                        {med.duration}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {rx.txHash && (
                                    <div className="flex items-center gap-2 text-xs text-emerald-100/40">
                                        <Shield className="h-3 w-3" />
                                        <span>Blockchain: {rx.txHash}</span>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
