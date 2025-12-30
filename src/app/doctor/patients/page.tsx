"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useDoctorStore } from "@/lib/stores/doctorStore";
import { AddPatientDialog } from "@/components/doctor/AddPatientDialog";
import { PatientDetailDialog } from "@/components/doctor/PatientDetailDialog";
import { Search, Phone, Mail, Calendar } from "lucide-react";
import type { Patient } from "@/lib/mockDb";

export default function PatientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const patients = useDoctorStore((state) => state.patients);
    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Patients</h1>
                    <p className="text-emerald-100/60 mt-1">Manage your patient records</p>
                </div>
                <AddPatientDialog />
            </div>

            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                        <Input
                            placeholder="Search patients by name or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-emerald-950/20 border-emerald-500/20 text-white placeholder:text-emerald-100/40"
                        />
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {filteredPatients.map((patient) => (
                        <Card key={patient.id} className="bg-emerald-950/20 border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                                                {patient.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
                                                <p className="text-sm text-emerald-100/60">{patient.bloodType || 'N/A'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                            <div className="flex items-center gap-2 text-emerald-100/60">
                                                <Mail className="h-4 w-4" />
                                                {patient.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-emerald-100/60">
                                                <Calendar className="h-4 w-4" />
                                                DOB: {new Date(patient.dateOfBirth).toLocaleDateString()}
                                            </div>
                                        </div>

                                        {patient.allergies.length > 0 && (
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-xs text-emerald-100/40">Allergies:</span>
                                                {patient.allergies.map((allergy, idx) => (
                                                    <Badge key={idx} variant="outline" className="border-red-500/30 text-red-400 text-xs">
                                                        {allergy}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30"
                                            onClick={() => setSelectedPatient(patient)}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </CardContent>
            </Card>

            {selectedPatient && (
                <PatientDetailDialog
                    patient={selectedPatient}
                    open={!!selectedPatient}
                    onOpenChange={(open) => !open && setSelectedPatient(null)}
                />
            )}
        </div>
    );
}
