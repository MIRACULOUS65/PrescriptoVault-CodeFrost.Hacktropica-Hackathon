'use client';

import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { AlertTriangle, ShieldAlert } from 'lucide-react';
import { type DrugInteraction } from '@/lib/mockDb';
import { useState } from 'react';

interface InteractionAlertProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    interactions: DrugInteraction[];
    onAcknowledge: () => void;
}

export function InteractionAlert({
    open,
    onOpenChange,
    interactions,
    onAcknowledge,
}: InteractionAlertProps) {
    const [acknowledged, setAcknowledged] = useState(false);

    const handleAcknowledge = () => {
        if (acknowledged) {
            onAcknowledge();
            setAcknowledged(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-lg border-destructive/50 bg-card">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent rounded-lg pointer-events-none"
                />

                <DialogHeader className="relative">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-full bg-destructive/20">
                            <ShieldAlert className="h-8 w-8 text-destructive" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl text-destructive">
                                Critical Drug Interaction
                            </DialogTitle>
                            <DialogDescription>
                                Review the following interaction carefully
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 py-4 relative">
                    {interactions.map((interaction, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-destructive/10 border border-destructive/30 space-y-3"
                        >
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-medium text-destructive">
                                        {interaction.severity.toUpperCase()} INTERACTION DETECTED
                                    </p>
                                    <p className="text-sm text-foreground mt-1">
                                        {interaction.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pl-8">
                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                    Recommendation
                                </p>
                                <p className="text-sm">{interaction.recommendation}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg relative">
                    <Checkbox
                        id="acknowledge"
                        checked={acknowledged}
                        onCheckedChange={(checked) => setAcknowledged(checked as boolean)}
                    />
                    <Label htmlFor="acknowledge" className="text-sm leading-relaxed cursor-pointer">
                        I acknowledge the risk and confirm that this prescription is medically
                        necessary. I accept full responsibility for this clinical decision.
                    </Label>
                </div>

                <DialogFooter className="gap-2 relative">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Go Back & Edit
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleAcknowledge}
                        disabled={!acknowledged}
                    >
                        Override & Continue
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
