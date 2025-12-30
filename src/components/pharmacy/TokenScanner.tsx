'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QrCode, Keyboard, Loader2, Search } from 'lucide-react';
import { verifyToken, type VerificationResult } from '@/lib/blockchain';

interface TokenScannerProps {
    onScanComplete: (result: VerificationResult) => void;
}

export function TokenScanner({ onScanComplete }: TokenScannerProps) {
    const [tokenId, setTokenId] = useState('');
    const [isVerifying, setIsVerifying] = useState(false);
    const [scanMode, setScanMode] = useState('manual');

    const handleVerify = async () => {
        if (!tokenId.trim()) return;

        setIsVerifying(true);
        try {
            const result = await verifyToken(tokenId.trim());
            onScanComplete(result);
        } catch (error) {
            console.error('Verification failed:', error);
            onScanComplete({
                valid: false,
                status: 'NOT_FOUND',
                message: 'Verification failed. Please try again.'
            });
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="space-y-6">
            <Tabs value={scanMode} onValueChange={setScanMode}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual" className="gap-2">
                        <Keyboard className="h-4 w-4" />
                        Manual Entry
                    </TabsTrigger>
                    <TabsTrigger value="camera" className="gap-2">
                        <QrCode className="h-4 w-4" />
                        Camera Scan
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="manual" className="space-y-4 mt-4">
                    <div className="space-y-2">
                        <Label>Token ID / Asset ID</Label>
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Enter token ID (e.g., ASA-9921)"
                                    value={tokenId}
                                    onChange={(e) => setTokenId(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                                    className="pl-10"
                                />
                            </div>
                            <Button
                                onClick={handleVerify}
                                disabled={!tokenId.trim() || isVerifying}
                                className="gap-2"
                            >
                                {isVerifying ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    'Verify'
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Quick Access Tokens (Demo) */}
                    <div className="pt-4 border-t border-border">
                        <Label className="text-xs text-muted-foreground">Quick Demo Tokens</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {['ASA-9921', 'ASA-9920', 'ASA-9919'].map(token => (
                                <Button
                                    key={token}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setTokenId(token)}
                                    className="text-xs"
                                >
                                    {token}
                                </Button>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="camera" className="mt-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="aspect-video bg-muted/50 rounded-lg flex flex-col items-center justify-center gap-4 border-2 border-dashed border-border"
                    >
                        <QrCode className="h-12 w-12 text-muted-foreground" />
                        <div className="text-center">
                            <p className="text-sm text-muted-foreground">Camera scanner</p>
                            <p className="text-xs text-muted-foreground/70">
                                (Use manual entry for demo)
                            </p>
                        </div>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
