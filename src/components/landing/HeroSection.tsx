'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, ArrowRight, Sparkles, Lock, Zap } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-primary/15 to-transparent rounded-full blur-3xl"
                />

                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>

            <div className="container mx-auto max-w-7xl px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block mb-6"
                        >
                            <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
                                <Sparkles className="h-4 w-4" />
                                Powered by Algorand Blockchain
                            </Badge>
                        </motion.div>

                        {/* Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
                        >
                            Secure Digital{' '}
                            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                                Prescriptions
                            </span>
                            <br />
                            on the Blockchain
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0"
                        >
                            Eliminate prescription fraud with blockchain verification.
                            Real-time drug interaction checks, QR-based dispensing,
                            and complete audit trails for healthcare compliance.
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Link href="/doctor">
                                <Button size="lg" className="w-full sm:w-auto group">
                                    Start for Free
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/pricing">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                                    View Pricing
                                </Button>
                            </Link>
                        </motion.div>

                        {/* Trust Badges */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start"
                        >
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Lock className="h-4 w-4" />
                                <span>HIPAA Compliant</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Shield className="h-4 w-4" />
                                <span>End-to-End Encrypted</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Zap className="h-4 w-4" />
                                <span>Real-time Verification</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Animated Shield */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="relative flex items-center justify-center"
                    >
                        <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                            {/* Outer Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 rounded-full border border-border/50 border-dashed"
                            />

                            {/* Middle Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-8 rounded-full border border-border/30"
                            />

                            {/* Inner Ring with Glow */}
                            <motion.div
                                animate={{
                                    boxShadow: [
                                        '0 0 40px rgba(255,255,255,0.1)',
                                        '0 0 80px rgba(255,255,255,0.2)',
                                        '0 0 40px rgba(255,255,255,0.1)',
                                    ],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute inset-16 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 flex items-center justify-center"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <Shield className="w-24 h-24 lg:w-32 lg:h-32 text-primary/80" />
                                </motion.div>
                            </motion.div>

                            {/* Floating Particles */}
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        y: [0, -20, 0],
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 3 + i * 0.5,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: i * 0.2,
                                    }}
                                    className="absolute w-2 h-2 bg-primary/50 rounded-full"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${10 + Math.random() * 80}%`,
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
