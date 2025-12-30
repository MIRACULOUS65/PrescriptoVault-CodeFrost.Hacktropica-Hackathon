'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Shield } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/features', label: 'Features' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/pricing', label: 'Pricing' },
];

interface NavigationProps {
    onSignInClick?: () => void;
    onGetStartedClick?: () => void;
}

export function Navigation({ onSignInClick, onGetStartedClick }: NavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <div className="w-full max-w-5xl rounded-full border border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:bg-black/70 hover:border-white/20">
                <div className="flex h-14 items-center justify-between px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 15, scale: 1.1 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                            className="bg-white/10 p-1.5 rounded-full"
                        >
                            <Shield className="h-5 w-5 text-emerald-400" />
                        </motion.div>
                        <span className="text-lg font-bold tracking-tight text-white hidden sm:inline-block">
                            Prescripto<span className="text-emerald-400/80">Vault</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-all hover:bg-white/5 rounded-full font-medium"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-2">
                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/sign-in">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-white/70 hover:text-white hover:bg-white/5 rounded-full"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/get-started">
                                <Button
                                    size="sm"
                                    className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all"
                                >
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu */}
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild className="md:hidden">
                                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10 rounded-full h-9 w-9">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="top" className="w-full bg-black/95 border-b border-white/10 p-0">
                                <div className="flex flex-col p-6 pt-16 gap-6 items-center">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-2xl font-medium text-white/80 hover:text-emerald-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <div className="w-full max-w-sm flex flex-col gap-3 pt-6 border-t border-white/10">
                                        <Button
                                            variant="outline"
                                            className="w-full h-12 rounded-full border-white/20 text-white hover:bg-white/10 text-lg"
                                            onClick={() => {
                                                setIsOpen(false);
                                                onSignInClick?.();
                                            }}
                                        >
                                            Sign In
                                        </Button>
                                        <Button
                                            className="w-full h-12 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 text-lg font-semibold shadow-lg"
                                            onClick={() => {
                                                setIsOpen(false);
                                                onGetStartedClick?.();
                                            }}
                                        >
                                            Get Started
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}
