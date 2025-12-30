'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Zap } from 'lucide-react';

export function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);

    const plans = [
        {
            name: "Basic",
            userType: "Patients",
            price: "Free",
            description: "Free for all patients",
            features: [
                "Unlimited prescription reception",
                "Digital wallet for all tokens",
                "QR code generation",
                "Medication reminders",
                "Health streak tracking",
                "Telehealth booking"
            ],
            cta: "Get Started",
            highlighted: false
        },
        {
            name: "Clinic Starter",
            userType: "Doctors",
            price: isAnnual ? "₹29,999" : "₹2,999",
            description: "Perfect for individual practitioners",
            features: [
                "Up to 100 prescriptions/month",
                "AI-assisted prescription writer",
                "Real-time drug interaction checks",
                "Patient history access",
                "One-click blockchain minting",
                "Basic analytics dashboard",
                "Email support"
            ],
            cta: "Start Free Trial",
            highlighted: true
        },
        {
            name: "Enterprise",
            userType: "Enterprises",
            price: "Custom",
            description: "For hospitals & pharmacy chains",
            features: [
                "Unlimited prescriptions",
                "Multi-location support",
                "API access for integration",
                "Advanced analytics & reporting",
                "Custom branding",
                "Dedicated account manager",
                "SLA guarantee",
                "HIPAA audit support"
            ],
            cta: "Contact Sales",
            highlighted: false
        }
    ];

    return (
        <div className="bg-black mt-14 py-24 relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-900/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-12"
                >
                    <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-400 bg-emerald-950/10 backdrop-blur-sm">
                        <Zap className="h-3 w-3 mr-1" />
                        Pricing
                    </Badge>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                        Simple, <span className="text-emerald-400">Transparent</span> Pricing
                    </h1>
                    <p className="text-lg text-emerald-100/60 mb-6">
                        Choose the plan that fits your practice. Patients always use PrescriptoVault for free.
                    </p>

                    <div className="inline-flex items-center bg-emerald-950/20 border border-emerald-500/20 rounded-full p-1 backdrop-blur-sm">
                        <button
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${!isAnnual
                                ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                : 'text-emerald-100/60 hover:text-emerald-400'
                                }`}
                            onClick={() => setIsAnnual(false)}
                        >
                            Monthly
                        </button>
                        <button
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${isAnnual
                                ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                                : 'text-emerald-100/60 hover:text-emerald-400'
                                }`}
                            onClick={() => setIsAnnual(true)}
                        >
                            Annual
                            <span className="ml-2 text-xs bg-emerald-500/20 px-2 py-0.5 rounded-full">Save 17%</span>
                        </button>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mt-12">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02, y: -5 }}
                            className="relative group"
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-md" />
                                        <Badge className="relative bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 backdrop-blur-sm">
                                            <Sparkles className="h-3 w-3 mr-1" />
                                            Most Popular
                                        </Badge>
                                    </div>
                                </div>
                            )}

                            <Card
                                className={`relative h-full overflow-hidden border transition-all duration-300 ${plan.highlighted
                                    ? 'border-emerald-500/40 bg-black/40 backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                                    : 'border-emerald-500/20 bg-black/40 backdrop-blur-md hover:border-emerald-500/30'
                                    }`}
                            >
                                {/* Subtle glow effect on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <CardContent className="p-6 relative z-10">
                                    <div className="mb-6">
                                        <Badge variant="outline" className="mb-3 border-emerald-500/30 text-emerald-400 bg-emerald-950/30">
                                            {plan.userType}
                                        </Badge>
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-4xl font-bold text-white">{plan.price}</span>
                                            {plan.price !== "Custom" && plan.price !== "Free" && (
                                                <span className="text-sm text-emerald-100/60">
                                                    per user/{isAnnual ? 'year' : 'month'}
                                                </span>
                                            )}
                                            {plan.price === "Free" && (
                                                <span className="text-sm text-emerald-100/60">forever</span>
                                            )}
                                        </div>
                                        <p className="text-sm text-emerald-100/60">{plan.description}</p>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        {plan.features.map((feature, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + i * 0.05 }}
                                                className="flex items-center gap-2.5"
                                            >
                                                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center">
                                                    <Check className="h-3 w-3 text-emerald-400" />
                                                </div>
                                                <span className="text-sm text-emerald-100/80">{feature}</span>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <button
                                        className={`w-full py-3 px-4 rounded-xl text-sm font-medium transition-all duration-300 ${plan.highlighted
                                            ? 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]'
                                            : 'border border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30 hover:border-emerald-500/50'
                                            }`}
                                    >
                                        {plan.cta}
                                    </button>
                                </CardContent>

                                {/* Animated border gradient */}
                                {plan.highlighted && (
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-400/20 to-emerald-500/20 blur-sm" />
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PricingSection;
