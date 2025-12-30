'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileCheck, Clock, User, Pill } from 'lucide-react';
import { getDoctorPrescriptions, mockPatients, type Prescription } from '@/lib/mockDb';

interface PatientHistoryProps {
    doctorId: string;
}

export function PatientHistory({ doctorId }: PatientHistoryProps) {
    const prescriptions = getDoctorPrescriptions(doctorId);

    const getPatientName = (patientId: string) => {
        return mockPatients.find(p => p.id === patientId)?.name || 'Unknown Patient';
    };

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    if (prescriptions.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                No prescriptions issued yet.
            </div>
        );
    }

    return (
        <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
                {prescriptions.map((prescription, index) => (
                    <motion.div
                        key={prescription.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border border-border/50 bg-card/30 hover:bg-card/50 transition-colors"
                    >
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${prescription.status === 'minted'
                                        ? 'bg-green-500/10'
                                        : 'bg-muted'
                                    }`}>
                                    <FileCheck className={`h-5 w-5 ${prescription.status === 'minted'
                                            ? 'text-green-500'
                                            : 'text-muted-foreground'
                                        }`} />
                                </div>
                                <div>
                                    <p className="font-medium">{prescription.assetId}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="h-3 w-3" />
                                        <span>{getPatientName(prescription.patientId)}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant={prescription.status === 'minted' ? 'default' : 'secondary'}>
                                {prescription.status}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                            <Clock className="h-3 w-3" />
                            <span>{formatDate(prescription.createdAt)}</span>
                        </div>

                        <div className="space-y-2">
                            {prescription.drugs.map((drug, drugIndex) => (
                                <div
                                    key={drugIndex}
                                    className="flex items-center gap-2 text-sm p-2 rounded bg-muted/50"
                                >
                                    <Pill className="h-4 w-4 text-muted-foreground shrink-0" />
                                    <span className="font-medium">{drug.drugName}</span>
                                    <span className="text-muted-foreground">
                                        {drug.dosage} • {drug.frequency} • {drug.duration}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </ScrollArea>
    );
}
