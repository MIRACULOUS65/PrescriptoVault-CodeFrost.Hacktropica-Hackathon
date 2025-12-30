"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/contexts/AuthContext';
import { celoWallet, type WalletState, CELO_NETWORK, VERIFICATION_FEE } from '@/lib/celo';
import { supabase } from '@/lib/supabase/client';
import { Wallet, CheckCircle, AlertCircle, ArrowRight, Loader2, ExternalLink, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function VerifyWalletPage() {
    const { user, profile, role, refreshProfile, isLoading: authLoading } = useAuth();
    const [walletState, setWalletState] = useState<WalletState | null>(null);
    const [step, setStep] = useState<'connect' | 'network' | 'verify' | 'success'>('connect');
    const [isConnecting, setIsConnecting] = useState(false);
    const [isSwitching, setIsSwitching] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [txHash, setTxHash] = useState<string | null>(null);

    // Check wallet state on mount
    useEffect(() => {
        const checkWallet = async () => {
            const state = await celoWallet.getWalletState();
            setWalletState(state);

            if (state.isConnected && state.isCorrectNetwork) {
                setStep('verify');
            } else if (state.isConnected) {
                setStep('network');
            }
        };

        checkWallet();

        // Listen for account/chain changes
        celoWallet.onAccountsChanged(async () => {
            const state = await celoWallet.getWalletState();
            setWalletState(state);
        });

        celoWallet.onChainChanged(async () => {
            const state = await celoWallet.getWalletState();
            setWalletState(state);
            if (state.isCorrectNetwork) {
                setStep('verify');
            }
        });

        return () => {
            celoWallet.removeListeners();
        };
    }, []);

    // Redirect if already verified
    useEffect(() => {
        if (!authLoading && profile?.verified && role) {
            console.log('✅ Already verified, redirecting to portal:', role);
            window.location.href = `/${role}`;
        }
    }, [authLoading, profile, role]);

    // Connect wallet
    const handleConnect = async () => {
        setIsConnecting(true);
        setError(null);

        try {
            const state = await celoWallet.connect();
            setWalletState(state);

            if (state.isCorrectNetwork) {
                setStep('verify');
            } else {
                setStep('network');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsConnecting(false);
        }
    };

    // Switch to Celo network
    const handleSwitchNetwork = async () => {
        setIsSwitching(true);
        setError(null);

        try {
            await celoWallet.switchToCelo();
            const state = await celoWallet.getWalletState();
            setWalletState(state);
            setStep('verify');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSwitching(false);
        }
    };

    // Verify with transaction
    const handleVerify = async () => {
        if (!user || !walletState?.address) return;

        setIsVerifying(true);
        setError(null);

        try {
            // Sign a message instead of making transaction (for testnet)
            const message = `Verify wallet for PrescriptoVault\nUser ID: ${user.id}\nTimestamp: ${Date.now()}`;
            const signature = await celoWallet.signMessage(message);

            console.log('Signature obtained:', signature);

            // Update user profile with wallet address and verified status
            const { error: updateError } = await supabase
                .from('users')
                .update({
                    wallet_address: walletState.address,
                    verified: true,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (updateError) {
                throw new Error('Failed to update verification status');
            }

            // Refresh profile
            await refreshProfile();

            setStep('success');

            // Redirect to portal after delay
            setTimeout(() => {
                if (role) {
                    window.location.href = `/${role}`;
                }
            }, 2000);

        } catch (err: any) {
            console.error('Verification error:', err);
            setError(err.message || 'Verification failed');
        } finally {
            setIsVerifying(false);
        }
    };

    // Show loading while checking auth
    if (authLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20 max-w-md w-full mx-4">
                    <CardHeader className="text-center">
                        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                        <CardTitle className="text-white">Not Authenticated</CardTitle>
                        <CardDescription className="text-emerald-100/60">
                            Please sign in first to verify your wallet.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button
                            onClick={() => window.location.href = '/sign-in'}
                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black"
                        >
                            Go to Sign In
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-lg w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <Shield className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-white">Wallet Verification</h1>
                    <p className="text-emerald-100/60 mt-2">
                        Connect your wallet to complete verification
                    </p>
                </motion.div>

                {/* Steps Progress */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {['connect', 'network', 'verify', 'success'].map((s, i) => (
                        <div key={s} className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${step === s ? 'bg-emerald-500' :
                                    ['connect', 'network', 'verify', 'success'].indexOf(step) > i
                                        ? 'bg-emerald-500/50'
                                        : 'bg-gray-600'
                                }`} />
                            {i < 3 && <div className={`w-8 h-0.5 ${['connect', 'network', 'verify', 'success'].indexOf(step) > i
                                    ? 'bg-emerald-500/50'
                                    : 'bg-gray-600'
                                }`} />}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {step === 'connect' && (
                        <motion.div
                            key="connect"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                                <CardHeader className="text-center">
                                    <Wallet className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                                    <CardTitle className="text-white">Connect MetaMask</CardTitle>
                                    <CardDescription className="text-emerald-100/60">
                                        Connect your MetaMask wallet to verify your identity
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {!celoWallet.isMetaMaskInstalled() ? (
                                        <div className="text-center">
                                            <p className="text-red-400 mb-4">MetaMask is not installed</p>
                                            <a
                                                href="https://metamask.io/download/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                                                    Install MetaMask
                                                    <ExternalLink className="ml-2 h-4 w-4" />
                                                </Button>
                                            </a>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={handleConnect}
                                            disabled={isConnecting}
                                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                                        >
                                            {isConnecting ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Connecting...
                                                </>
                                            ) : (
                                                <>
                                                    <Wallet className="mr-2 h-4 w-4" />
                                                    Connect MetaMask
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 'network' && (
                        <motion.div
                            key="network"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                                <CardHeader className="text-center">
                                    <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
                                    <CardTitle className="text-white">Switch Network</CardTitle>
                                    <CardDescription className="text-emerald-100/60">
                                        Please switch to {CELO_NETWORK.chainName}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {walletState?.address && (
                                        <div className="text-center text-sm text-emerald-100/60">
                                            Connected: {walletState.address.slice(0, 6)}...{walletState.address.slice(-4)}
                                        </div>
                                    )}
                                    <Button
                                        onClick={handleSwitchNetwork}
                                        disabled={isSwitching}
                                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                                    >
                                        {isSwitching ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Switching...
                                            </>
                                        ) : (
                                            <>
                                                Switch to Celo
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 'verify' && (
                        <motion.div
                            key="verify"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                                <CardHeader className="text-center">
                                    <Shield className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                                    <CardTitle className="text-white">Verify Ownership</CardTitle>
                                    <CardDescription className="text-emerald-100/60">
                                        Sign a message to verify wallet ownership
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {walletState?.address && (
                                        <div className="bg-emerald-950/30 rounded-lg p-4 border border-emerald-500/20">
                                            <div className="text-sm text-emerald-100/60 mb-1">Connected Wallet</div>
                                            <div className="text-white font-mono text-sm break-all">
                                                {walletState.address}
                                            </div>
                                            {walletState.balance && (
                                                <div className="text-emerald-400 text-sm mt-2">
                                                    Balance: {parseFloat(walletState.balance).toFixed(4)} CELO
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    <Button
                                        onClick={handleVerify}
                                        disabled={isVerifying}
                                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold"
                                    >
                                        {isVerifying ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Verifying...
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Sign & Verify
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}

                    {step === 'success' && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                                <CardContent className="pt-10 pb-10 text-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", delay: 0.2 }}
                                    >
                                        <CheckCircle className="h-20 w-20 text-emerald-500 mx-auto mb-4" />
                                    </motion.div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Verified!</h2>
                                    <p className="text-emerald-100/60 mb-6">
                                        Your wallet has been verified. Redirecting to your dashboard...
                                    </p>
                                    <Loader2 className="h-6 w-6 animate-spin text-emerald-500 mx-auto" />
                                </CardContent>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Message */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                    >
                        <p className="text-red-400 text-center text-sm">{error}</p>
                    </motion.div>
                )}

                {/* User Info */}
                <div className="mt-6 text-center text-sm text-emerald-100/40">
                    <p>Signed in as: {user?.email}</p>
                    <p>Role: {role || 'Not set'}</p>
                </div>
            </div>
        </div>
    );
}
