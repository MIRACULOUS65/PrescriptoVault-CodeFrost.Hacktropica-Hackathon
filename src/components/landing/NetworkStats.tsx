'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Ban, Activity, Users, Building2, Stethoscope, TrendingUp, Zap } from 'lucide-react';
import { mockNetworkStats } from '@/lib/mockDb';

interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: number;
    suffix?: string;
    delay?: number;
    showProgress?: boolean;
    maxValue?: number;
    trend?: number;
    isLive?: boolean;
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        if (latest >= 1000) {
            return `${(latest / 1000).toFixed(1)}K`;
        }
        return Math.round(latest).toLocaleString();
    });
    const [displayValue, setDisplayValue] = useState('0');

    useEffect(() => {
        const controls = animate(count, value, { duration, ease: 'easeOut' });
        const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [value, duration, count, rounded]);

    return <span>{displayValue}</span>;
}

function MiniSparkline({ trend = 0 }: { trend?: number }) {
    const points = [40, 45, 38, 50, 48, 55, 52, 60];
    const max = Math.max(...points);
    const normalized = points.map(p => (p / max) * 100);

    return (
        <div className="flex items-end gap-0.5 h-8 opacity-40 group-hover:opacity-70 transition-opacity">
            {normalized.map((height, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                    className="w-1 bg-emerald-400 rounded-full"
                />
            ))}
        </div>
    );
}

function StatCard({
    icon: Icon,
    label,
    value,
    suffix = '',
    delay = 0,
    showProgress = false,
    maxValue = 100,
    trend = 0,
    isLive = false
}: StatCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const progress = showProgress ? (value / maxValue) * 100 : 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{ scale: 1.02, y: -5 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <Card className={`relative overflow-hidden bg-black/40 backdrop-blur-md border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 group ${isHovered ? 'h-[260px]' : 'h-[200px]'}`}>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Live indicator */}
                {isLive && (
                    <div className="absolute top-3 right-3">
                        <Badge variant="outline" className="border-emerald-500/30 bg-emerald-950/30 text-emerald-400 text-[10px] px-2 py-0.5">
                            <span className="relative flex h-2 w-2 mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            LIVE
                        </Badge>
                    </div>
                )}

                <CardContent className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 group-hover:bg-emerald-950/70 group-hover:border-emerald-500/50 transition-all">
                            <Icon className="h-6 w-6 text-emerald-400" />
                        </div>
                        {trend !== undefined && trend !== 0 && (
                            <div className="flex items-center gap-1 text-xs">
                                <TrendingUp className={`h-3 w-3 ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`} />
                                <span className={trend > 0 ? 'text-emerald-400' : 'text-red-400'}>
                                    {trend > 0 ? '+' : ''}{trend}%
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="text-2xl font-bold text-white tracking-tight">
                            <AnimatedCounter value={value} />
                            <span className="text-emerald-400">{suffix}</span>
                        </p>
                        <p className="text-sm text-emerald-100/60 font-medium">{label}</p>
                    </div>

                    {/* Progress bar - only visible on hover */}
                    {showProgress && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                height: isHovered ? 'auto' : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 space-y-1 overflow-hidden"
                        >
                            <div className="h-1.5 bg-emerald-950/50 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: isHovered ? `${progress}%` : 0 }}
                                    transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                />
                            </div>
                            <p className="text-xs text-emerald-100/40">
                                {progress.toFixed(1)}% capacity
                            </p>
                        </motion.div>
                    )}

                    {/* Mini sparkline */}
                    {isHovered && !showProgress && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="mt-4 pt-4 border-t border-emerald-500/10"
                        >
                            <MiniSparkline trend={trend} />
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function NetworkStats() {
    const stats: StatCardProps[] = [
        {
            icon: Shield,
            label: 'Total Assets Secured',
            value: mockNetworkStats.totalAssetsMinted,
            trend: 12.5,
            isLive: true,
        },
        {
            icon: Ban,
            label: 'Fraud Attempts Blocked',
            value: mockNetworkStats.fraudAttemptsBlocked,
            trend: -8.2,
        },
        {
            icon: Activity,
            label: 'Network Uptime',
            value: mockNetworkStats.networkUptime,
            suffix: '%',
            showProgress: true,
            maxValue: 100,
            isLive: true,
        },
        {
            icon: Stethoscope,
            label: 'Active Doctors',
            value: mockNetworkStats.activeDoctors,
            trend: 5.3,
        },
        {
            icon: Users,
            label: 'Active Patients',
            value: mockNetworkStats.activePatients,
            trend: 18.7,
            isLive: true,
        },
        {
            icon: Building2,
            label: 'Partner Pharmacies',
            value: mockNetworkStats.activePharmacies,
            trend: 3.1,
        },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Animated background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-950/10 backdrop-blur-sm">
                        <Zap className="h-3 w-3 mr-1" />
                        Real-Time Analytics
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                        Network <span className="text-emerald-400">Performance</span>
                    </h2>
                    <p className="text-lg text-emerald-100/60 max-w-2xl mx-auto leading-relaxed">
                        Our blockchain network processes thousands of prescriptions daily,
                        ensuring security and preventing fraud across India's healthcare system.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <StatCard key={stat.label} {...stat} delay={index * 0.1} />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-emerald-100/40">
                        Data updated every 30 seconds • Powered by Algorand Mainnet
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
