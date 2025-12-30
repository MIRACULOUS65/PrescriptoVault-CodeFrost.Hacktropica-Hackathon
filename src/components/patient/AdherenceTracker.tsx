'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Flame, Check, Clock, Pill, TrendingUp } from 'lucide-react';
import { type Patient } from '@/lib/mockDb';

interface AdherenceTrackerProps {
    patient: Patient;
}

const mockMedications = [
    { id: '1', name: 'Metformin 500mg', time: '8:00 AM', taken: true },
    { id: '2', name: 'Lisinopril 10mg', time: '8:00 AM', taken: true },
    { id: '3', name: 'Metformin 500mg', time: '8:00 PM', taken: false },
];

export function AdherenceTracker({ patient }: AdherenceTrackerProps) {
    const [medications, setMedications] = useState(mockMedications);

    const toggleMedication = (id: string) => {
        setMedications(prev =>
            prev.map(med =>
                med.id === id ? { ...med, taken: !med.taken } : med
            )
        );
    };

    const completedCount = medications.filter(m => m.taken).length;
    const completionPercentage = Math.round((completedCount / medications.length) * 100);

    return (
        <div className="space-y-6">
            {/* Stats Row */}
            <div className="grid sm:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-orange-500/20">
                                <Flame className="h-6 w-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{patient.streak}</p>
                                <p className="text-sm text-muted-foreground">Day Streak</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-green-500/20">
                                <TrendingUp className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{patient.healthScore}</p>
                                <p className="text-sm text-muted-foreground">Health Score</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="p-3 rounded-xl bg-blue-500/20">
                                <Check className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-3xl font-bold">{completionPercentage}%</p>
                                <p className="text-sm text-muted-foreground">Today&apos;s Progress</p>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Today's Medications */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Today&apos;s Medications</h3>
                    <Badge variant="outline">
                        {completedCount}/{medications.length} completed
                    </Badge>
                </div>

                <div className="space-y-3">
                    {medications.map((med, index) => (
                        <motion.div
                            key={med.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className={`transition-all ${med.taken
                                    ? 'bg-green-500/5 border-green-500/20'
                                    : 'bg-card/50 border-border/50 hover:border-border'
                                }`}>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <Checkbox
                                            id={med.id}
                                            checked={med.taken}
                                            onCheckedChange={() => toggleMedication(med.id)}
                                            className="h-5 w-5"
                                        />
                                        <div className="flex-1">
                                            <label
                                                htmlFor={med.id}
                                                className={`font-medium cursor-pointer ${med.taken ? 'line-through text-muted-foreground' : ''
                                                    }`}
                                            >
                                                {med.name}
                                            </label>
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Clock className="h-3 w-3" />
                                                <span>{med.time}</span>
                                            </div>
                                        </div>
                                        <div className={`p-2 rounded-lg ${med.taken ? 'bg-green-500/20' : 'bg-muted'
                                            }`}>
                                            <Pill className={`h-4 w-4 ${med.taken ? 'text-green-500' : 'text-muted-foreground'
                                                }`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Add Reminder Button */}
            <div className="text-center pt-4">
                <Button variant="outline" className="gap-2">
                    <Clock className="h-4 w-4" />
                    Set Custom Reminder
                </Button>
            </div>
        </div>
    );
}
