'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    Plus,
    X,
    AlertTriangle,
    AlertCircle,
    Info,
    Search,
    Loader2,
    CheckCircle2,
    Coins
} from 'lucide-react';
import {
    type Doctor,
    type Drug,
    mockPatients,
    mockDrugs,
    searchDrugs,
    checkDrugInteractions,
    type DrugInteraction
} from '@/lib/mockDb';
import { mintPrescription } from '@/lib/blockchain';
import { InteractionAlert } from './InteractionAlert';

interface PrescriptionWriterProps {
    doctor: Doctor;
}

interface PrescribedDrug {
    drug: Drug;
    dosage: string;
    frequency: string;
    duration: string;
    quantity: number;
    notes: string;
}

export function PrescriptionWriter({ doctor }: PrescriptionWriterProps) {
    const [selectedPatient, setSelectedPatient] = useState<string>('');
    const [drugSearch, setDrugSearch] = useState('');
    const [prescribedDrugs, setPrescribedDrugs] = useState<PrescribedDrug[]>([]);
    const [showInteractionAlert, setShowInteractionAlert] = useState(false);
    const [interactions, setInteractions] = useState<DrugInteraction[]>([]);
    const [interactionAcknowledged, setInteractionAcknowledged] = useState(false);
    const [isMinting, setIsMinting] = useState(false);
    const [mintSuccess, setMintSuccess] = useState<{ assetId: string; txHash: string } | null>(null);

    // Drug search suggestions
    const drugSuggestions = useMemo(() => {
        if (drugSearch.length < 2) return [];
        return searchDrugs(drugSearch).slice(0, 5);
    }, [drugSearch]);

    // Check for interactions when drugs change
    const checkInteractions = () => {
        if (prescribedDrugs.length < 2) {
            setInteractions([]);
            return;
        }
        const drugIds = prescribedDrugs.map(pd => pd.drug.id);
        const foundInteractions = checkDrugInteractions(drugIds);
        setInteractions(foundInteractions);

        if (foundInteractions.some(i => i.severity === 'critical')) {
            setShowInteractionAlert(true);
            setInteractionAcknowledged(false);
        }
    };

    const addDrug = (drug: Drug) => {
        if (prescribedDrugs.some(pd => pd.drug.id === drug.id)) return;

        setPrescribedDrugs(prev => [
            ...prev,
            {
                drug,
                dosage: drug.strengths[0] || '',
                frequency: 'Once daily',
                duration: '7 days',
                quantity: 7,
                notes: ''
            }
        ]);
        setDrugSearch('');

        // Check interactions after adding
        setTimeout(checkInteractions, 100);
    };

    const removeDrug = (drugId: string) => {
        setPrescribedDrugs(prev => prev.filter(pd => pd.drug.id !== drugId));
        setTimeout(checkInteractions, 100);
    };

    const updateDrug = (drugId: string, field: keyof PrescribedDrug, value: string | number) => {
        setPrescribedDrugs(prev =>
            prev.map(pd =>
                pd.drug.id === drugId ? { ...pd, [field]: value } : pd
            )
        );
    };

    const handleMint = async () => {
        if (!selectedPatient || prescribedDrugs.length === 0) return;

        // Check for unacknowledged critical interactions
        const hasCritical = interactions.some(i => i.severity === 'critical');
        if (hasCritical && !interactionAcknowledged) {
            setShowInteractionAlert(true);
            return;
        }

        setIsMinting(true);
        try {
            const result = await mintPrescription(
                doctor.id,
                selectedPatient,
                prescribedDrugs.map(pd => ({
                    drugId: pd.drug.id,
                    drugName: pd.drug.name,
                    dosage: pd.dosage,
                    frequency: pd.frequency,
                    duration: pd.duration,
                    quantity: pd.quantity,
                    notes: pd.notes
                }))
            );

            if (result.success && result.assetId && result.txHash) {
                setMintSuccess({ assetId: result.assetId, txHash: result.txHash });
                // Reset form after success
                setTimeout(() => {
                    setPrescribedDrugs([]);
                    setSelectedPatient('');
                    setMintSuccess(null);
                    setInteractionAcknowledged(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Minting failed:', error);
        } finally {
            setIsMinting(false);
        }
    };

    const canMint = selectedPatient &&
        prescribedDrugs.length > 0 &&
        !isMinting &&
        (!interactions.some(i => i.severity === 'critical') || interactionAcknowledged);

    return (
        <div className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-2">
                <Label>Select Patient</Label>
                <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                        {mockPatients.map(patient => (
                            <SelectItem key={patient.id} value={patient.id}>
                                <div className="flex items-center gap-2">
                                    <span>{patient.name}</span>
                                    <span className="text-xs text-muted-foreground">
                                        ({new Date().getFullYear() - patient.dateOfBirth.getFullYear()} years)
                                    </span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Drug Search */}
            <div className="space-y-2">
                <Label>Add Medication</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search drugs (e.g., Metformin, Amoxicillin)..."
                        value={drugSearch}
                        onChange={(e) => setDrugSearch(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Drug Suggestions */}
                <AnimatePresence>
                    {drugSuggestions.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="border border-border rounded-lg overflow-hidden"
                        >
                            {drugSuggestions.map(drug => (
                                <button
                                    key={drug.id}
                                    onClick={() => addDrug(drug)}
                                    className="w-full p-3 text-left hover:bg-accent transition-colors flex items-center justify-between"
                                >
                                    <div>
                                        <p className="font-medium">{drug.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {drug.genericName} • {drug.category}
                                        </p>
                                    </div>
                                    <Plus className="h-4 w-4 text-muted-foreground" />
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Interaction Warnings */}
            <AnimatePresence>
                {interactions.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2"
                    >
                        {interactions.map((interaction, index) => (
                            <div
                                key={index}
                                className={`p-3 rounded-lg border flex items-start gap-3 ${interaction.severity === 'critical'
                                        ? 'bg-destructive/10 border-destructive/50 text-destructive'
                                        : interaction.severity === 'moderate'
                                            ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-600'
                                            : 'bg-blue-500/10 border-blue-500/50 text-blue-600'
                                    }`}
                            >
                                {interaction.severity === 'critical' ? (
                                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                                ) : interaction.severity === 'moderate' ? (
                                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                                ) : (
                                    <Info className="h-5 w-5 shrink-0 mt-0.5" />
                                )}
                                <div>
                                    <p className="font-medium text-sm">
                                        {interaction.severity.toUpperCase()} Interaction
                                    </p>
                                    <p className="text-sm opacity-80">{interaction.description}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Prescribed Drugs List */}
            <div className="space-y-4">
                <Label>Prescription ({prescribedDrugs.length} medication{prescribedDrugs.length !== 1 ? 's' : ''})</Label>

                <AnimatePresence mode="popLayout">
                    {prescribedDrugs.map((pd) => (
                        <motion.div
                            key={pd.drug.id}
                            layout
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Card className="bg-card/50 border-border/50">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between gap-4 mb-4">
                                        <div>
                                            <h4 className="font-semibold">{pd.drug.name}</h4>
                                            <p className="text-sm text-muted-foreground">{pd.drug.genericName}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => removeDrug(pd.drug.id)}
                                            className="shrink-0"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Dosage</Label>
                                            <Select
                                                value={pd.dosage}
                                                onValueChange={(v) => updateDrug(pd.drug.id, 'dosage', v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {pd.drug.strengths.map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Frequency</Label>
                                            <Select
                                                value={pd.frequency}
                                                onValueChange={(v) => updateDrug(pd.drug.id, 'frequency', v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Once daily">Once daily</SelectItem>
                                                    <SelectItem value="Twice daily">Twice daily</SelectItem>
                                                    <SelectItem value="Three times daily">Three times daily</SelectItem>
                                                    <SelectItem value="Four times daily">Four times daily</SelectItem>
                                                    <SelectItem value="As needed">As needed</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Duration</Label>
                                            <Select
                                                value={pd.duration}
                                                onValueChange={(v) => updateDrug(pd.drug.id, 'duration', v)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="3 days">3 days</SelectItem>
                                                    <SelectItem value="5 days">5 days</SelectItem>
                                                    <SelectItem value="7 days">7 days</SelectItem>
                                                    <SelectItem value="14 days">14 days</SelectItem>
                                                    <SelectItem value="30 days">30 days</SelectItem>
                                                    <SelectItem value="60 days">60 days</SelectItem>
                                                    <SelectItem value="90 days">90 days</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-1">
                                            <Label className="text-xs">Quantity</Label>
                                            <Input
                                                type="number"
                                                min={1}
                                                value={pd.quantity}
                                                onChange={(e) => updateDrug(pd.drug.id, 'quantity', parseInt(e.target.value) || 1)}
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-1">
                                        <Label className="text-xs">Notes (optional)</Label>
                                        <Textarea
                                            placeholder="Special instructions..."
                                            value={pd.notes}
                                            onChange={(e) => updateDrug(pd.drug.id, 'notes', e.target.value)}
                                            className="resize-none h-16"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {prescribedDrugs.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                        Search and add medications to create a prescription
                    </div>
                )}
            </div>

            {/* Mint Button */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t border-border">
                {mintSuccess && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-green-500"
                    >
                        <CheckCircle2 className="h-5 w-5" />
                        <span className="text-sm">
                            Minted as {mintSuccess.assetId}
                        </span>
                    </motion.div>
                )}

                <Button
                    size="lg"
                    onClick={handleMint}
                    disabled={!canMint}
                    className="gap-2"
                >
                    {isMinting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Minting...
                        </>
                    ) : (
                        <>
                            <Coins className="h-4 w-4" />
                            Sign & Mint
                        </>
                    )}
                </Button>
            </div>

            {/* Interaction Alert Modal */}
            <InteractionAlert
                open={showInteractionAlert}
                onOpenChange={setShowInteractionAlert}
                interactions={interactions.filter(i => i.severity === 'critical')}
                onAcknowledge={() => {
                    setInteractionAcknowledged(true);
                    setShowInteractionAlert(false);
                }}
            />
        </div>
    );
}
