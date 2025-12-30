"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Patient } from "@/lib/mockDb";
import { Mail, Calendar, User, AlertTriangle, Activity } from "lucide-react";

interface PatientDetailDialogProps {
    patient: Patient;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function PatientDetailDialog({ patient, open, onOpenChange }: PatientDetailDialogProps) {
    const age = new Date().getFullYear() - new Date(patient.dateOfBirth).getFullYear();

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-black border-emerald-500/20 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-semibold">
                            {patient.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        {patient.name}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-emerald-100/40">Email</p>
                            <div className="flex items-center gap-2 text-sm text-emerald-100/80">
                                <Mail className="h-4 w-4" />
                                {patient.email}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-emerald-100/40">Date of Birth</p>
                            <div className="flex items-center gap-2 text-sm text-emerald-100/80">
                                <Calendar className="h-4 w-4" />
                                {new Date(patient.dateOfBirth).toLocaleDateString()} ({age} years)
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-emerald-100/40">Blood Type</p>
                            <div className="flex items-center gap-2 text-sm text-emerald-100/80">
                                <Activity className="h-4 w-4" />
                                {patient.bloodType || 'Not specified'}
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-emerald-100/40">Health Score</p>
                            <div className="flex items-center gap-2 text-sm text-emerald-100/80">
                                <Activity className="h-4 w-4" />
                                {patient.healthScore}/100
                            </div>
                        </div>
                    </div>

                    {/* Allergies */}
                    {patient.allergies.length > 0 && (
                        <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/20">
                            <div className="flex items-center gap-2 mb-2">
                                <AlertTriangle className="h-4 w-4 text-red-400" />
                                <h3 className="text-sm font-semibold text-red-400">Allergies</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {patient.allergies.map((allergy, idx) => (
                                    <Badge key={idx} variant="outline" className="border-red-500/30 text-red-400">
                                        {allergy}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Wallet Info */}
                    {patient.walletAddress && (
                        <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                            <p className="text-xs text-emerald-100/40 mb-1">Wallet Address</p>
                            <p className="text-sm text-emerald-400 font-mono">{patient.walletAddress}</p>
                        </div>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                            <p className="text-xs text-emerald-100/40 mb-1">Adherence Streak</p>
                            <p className="text-2xl font-bold text-emerald-400">{patient.streak} days</p>
                        </div>
                        <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                            <p className="text-xs text-emerald-100/40 mb-1">Verified</p>
                            <p className="text-2xl font-bold text-emerald-400">{patient.verified ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
