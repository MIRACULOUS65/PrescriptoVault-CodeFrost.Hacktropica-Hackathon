'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Clock,
    User,
    Stethoscope,
    Pill,
    Loader2,
    RotateCcw
} from 'lucide-react';
import { type VerificationResult as VerificationResultType, burnToken } from '@/lib/blockchain';
import { mockDoctors, mockPatients } from '@/lib/mockDb';

interface VerificationResultProps {
    result: VerificationResultType | null;
    onReset: () => void;
    pharmacistId: string;
    pharmacyId: string;
}

export function VerificationResult({
    result,
    onReset,
    pharmacistId,
    pharmacyId
}: VerificationResultProps) {
    const [isDispensing, setIsDispensing] = useState(false);
    const [dispensed, setDispensed] = useState(false);

    if (!result) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="p-4 rounded-full bg-muted mb-4">
                    <Clock className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">Awaiting Scan</h3>
                <p className="text-sm text-muted-foreground max-w-xs">
                    Enter a token ID or scan a QR code to verify a prescription.
                </p>
            </div>
        );
    }

    const handleDispense = async () => {
        if (!result.prescription) return;

        setIsDispensing(true);
        try {
            const burnResult = await burnToken(
                result.prescription.assetId,
                pharmacistId,
                pharmacyId
            );
            if (burnResult.success) {
                setDispensed(true);
            }
        } catch (error) {
            console.error('Dispense failed:', error);
        } finally {
            setIsDispensing(false);
        }
    };

    const handleReset = () => {
        setDispensed(false);
        onReset();
    };

    const patient = result.prescription
        ? mockPatients.find(p => p.id === result.prescription?.patientId)
        : null;
    const doctor = result.prescription
        ? mockDoctors.find(d => d.id === result.prescription?.doctorId)
        : null;

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={result.status + (dispensed ? '-dispensed' : '')}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-6"
            >
                {/* Status Banner */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-xl text-center ${dispensed
                            ? 'bg-blue-500/10 border border-blue-500/30'
                            : result.valid
                                ? 'bg-green-500/10 border border-green-500/30'
                                : result.status === 'FRAUD_ALERT'
                                    ? 'bg-destructive/10 border border-destructive/30'
                                    : 'bg-yellow-500/10 border border-yellow-500/30'
                        }`}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="flex justify-center mb-3"
                    >
                        {dispensed ? (
                            <CheckCircle2 className="h-16 w-16 text-blue-500" />
                        ) : result.valid ? (
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        ) : result.status === 'FRAUD_ALERT' ? (
                            <XCircle className="h-16 w-16 text-destructive" />
                        ) : (
                            <AlertTriangle className="h-16 w-16 text-yellow-500" />
                        )}
                    </motion.div>

                    <h3 className={`text-2xl font-bold mb-2 ${dispensed
                            ? 'text-blue-500'
                            : result.valid
                                ? 'text-green-500'
                                : result.status === 'FRAUD_ALERT'
                                    ? 'text-destructive'
                                    : 'text-yellow-500'
                        }`}>
                        {dispensed ? 'DISPENSED' : result.status.replace('_', ' ')}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                        {dispensed ? 'Medication has been dispensed. Token has been burned.' : result.message}
                    </p>

                    {result.status === 'FRAUD_ALERT' && result.dispensedAt && (
                        <p className="text-xs text-destructive mt-2">
                            Previously dispensed: {result.dispensedAt.toLocaleString()}
                        </p>
                    )}
                </motion.div>

                {/* Prescription Details */}
                {result.prescription && !dispensed && result.valid && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        {/* Patient & Doctor Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span className="text-xs">Patient</span>
                                </div>
                                <p className="font-medium">{patient?.name || 'Unknown'}</p>
                            </div>
                            <div className="p-4 rounded-lg bg-muted/50 space-y-1">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Stethoscope className="h-4 w-4" />
                                    <span className="text-xs">Prescriber</span>
                                </div>
                                <p className="font-medium">{doctor?.name || 'Unknown'}</p>
                            </div>
                        </div>

                        {/* Drug List */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium flex items-center gap-2">
                                <Pill className="h-4 w-4" />
                                Medications to Dispense
                            </h4>
                            {result.prescription.drugs.map((drug, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg bg-muted/50 flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-medium">{drug.drugName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {drug.dosage} • {drug.frequency} • {drug.duration}
                                        </p>
                                    </div>
                                    <Badge variant="secondary">
                                        Qty: {drug.quantity}
                                    </Badge>
                                </div>
                            ))}
                        </div>

                        {/* Dispense Button */}
                        <Button
                            className="w-full gap-2"
                            size="lg"
                            onClick={handleDispense}
                            disabled={isDispensing}
                        >
                            {isDispensing ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="h-4 w-4" />
                                    Confirm & Dispense
                                </>
                            )}
                        </Button>
                    </motion.div>
                )}

                {/* Reset Button */}
                {(dispensed || !result.valid) && (
                    <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={handleReset}
                    >
                        <RotateCcw className="h-4 w-4" />
                        Scan Another
                    </Button>
                )}
            </motion.div>
        </AnimatePresence>
    );
}
