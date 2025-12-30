'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { FileCheck, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { type Doctor } from '@/lib/mockDb';

interface DoctorStatsProps {
    doctor: Doctor;
}

export function DoctorStats({ doctor }: DoctorStatsProps) {
    const stats = [
        {
            icon: FileCheck,
            label: 'Prescriptions This Month',
            value: doctor.mintsThisMonth,
            subtext: `of ${doctor.mintLimit} limit`,
            percentage: (doctor.mintsThisMonth / doctor.mintLimit) * 100,
        },
        {
            icon: Clock,
            label: 'Remaining Quota',
            value: doctor.mintLimit - doctor.mintsThisMonth,
            subtext: 'prescriptions left',
        },
        {
            icon: AlertTriangle,
            label: 'Interactions Flagged',
            value: 3,
            subtext: 'this month',
        },
        {
            icon: TrendingUp,
            label: 'Patient Adherence',
            value: '87%',
            subtext: 'avg. rate',
        },
    ];

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <Card className="bg-card/50 border-border/50">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <p className="text-xs text-muted-foreground/70">{stat.subtext}</p>
                                </div>
                            </div>
                            {stat.percentage !== undefined && (
                                <div className="mt-3">
                                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stat.percentage}%` }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className="h-full bg-primary rounded-full"
                                        />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}
