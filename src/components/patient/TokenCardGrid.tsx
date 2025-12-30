'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { QRCodeSVG } from 'qrcode.react';
import { Pill, Calendar, User, QrCode, Clock, Copy, CheckCircle2 } from 'lucide-react';
import { type Prescription, mockDoctors } from '@/lib/mockDb';
import { generateQRPayload, encodeQRPayload } from '@/lib/blockchain';

interface TokenCardGridProps {
    prescriptions: Prescription[];
    privacyMode: boolean;
    isActive: boolean;
}

interface TokenCardProps {
    prescription: Prescription;
    privacyMode: boolean;
    isActive: boolean;
}

function TokenCard({ prescription, privacyMode, isActive }: TokenCardProps) {
    const [showQR, setShowQR] = useState(false);
    const [qrData, setQrData] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [copied, setCopied] = useState(false);

    const doctor = mockDoctors.find(d => d.id === prescription.doctorId);

    const handleRevealQR = () => {
        const payload = generateQRPayload(prescription.assetId, prescription.patientId);
        setQrData(encodeQRPayload(payload));
        setTimeLeft(300);
        setShowQR(true);

        // Start countdown
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setShowQR(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const copyAssetId = () => {
        navigator.clipboard.writeText(prescription.assetId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: isActive ? 1.02 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
                <Card
                    className={`relative overflow-hidden cursor-pointer transition-all ${isActive
                            ? 'bg-card/50 border-green-500/30 hover:border-green-500/50 shadow-lg shadow-green-500/5'
                            : 'bg-muted/30 border-border/30'
                        }`}
                    onClick={isActive ? handleRevealQR : undefined}
                >
                    {/* Glow Effect for Active */}
                    {isActive && (
                        <motion.div
                            animate={{
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none"
                        />
                    )}

                    <CardContent className="p-5 relative">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${isActive ? 'bg-green-500/10' : 'bg-muted'
                                    }`}>
                                    <Pill className={`h-5 w-5 ${isActive ? 'text-green-500' : 'text-muted-foreground'
                                        }`} />
                                </div>
                                <div>
                                    <p className="font-semibold">{prescription.assetId}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <User className="h-3 w-3" />
                                        <span>Dr. {doctor?.name.split(' ').pop()}</span>
                                    </div>
                                </div>
                            </div>
                            <Badge variant={isActive ? 'default' : 'secondary'}>
                                {isActive ? 'Active' : prescription.status}
                            </Badge>
                        </div>

                        {/* Drug List */}
                        <div className="space-y-2 mb-4">
                            {prescription.drugs.map((drug, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between text-sm p-2 rounded bg-muted/50"
                                >
                                    <span className={`font-medium ${privacyMode ? 'blur-sm select-none' : ''}`}>
                                        {drug.drugName}
                                    </span>
                                    <span className={`text-muted-foreground text-xs ${privacyMode ? 'blur-sm select-none' : ''}`}>
                                        {drug.dosage} • {drug.frequency}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Calendar className="h-3 w-3" />
                                <span>{prescription.createdAt.toLocaleDateString()}</span>
                            </div>
                            {isActive && (
                                <Button size="sm" variant="ghost" className="gap-1 text-xs">
                                    <QrCode className="h-3 w-3" />
                                    Tap to Reveal QR
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* QR Code Modal */}
            <Dialog open={showQR} onOpenChange={setShowQR}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="text-center">Scan at Pharmacy</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-6 py-4">
                        {/* QR Code */}
                        <div className="p-4 bg-white rounded-xl">
                            <QRCodeSVG
                                value={qrData}
                                size={200}
                                level="H"
                                includeMargin={false}
                            />
                        </div>

                        {/* Timer */}
                        <div className="flex items-center gap-2 text-sm">
                            <Clock className={`h-4 w-4 ${timeLeft < 60 ? 'text-destructive' : 'text-muted-foreground'}`} />
                            <span className={timeLeft < 60 ? 'text-destructive font-medium' : 'text-muted-foreground'}>
                                Expires in {formatTime(timeLeft)}
                            </span>
                        </div>

                        {/* Asset ID */}
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-muted w-full">
                            <span className="text-sm font-mono flex-1">{prescription.assetId}</span>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={copyAssetId}
                            >
                                {copied ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                ) : (
                                    <Copy className="h-4 w-4" />
                                )}
                            </Button>
                        </div>

                        <p className="text-xs text-muted-foreground text-center">
                            Show this QR code to the pharmacist. It will expire automatically for your security.
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}

export function TokenCardGrid({ prescriptions, privacyMode, isActive }: TokenCardGridProps) {
    if (prescriptions.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                {isActive
                    ? 'No active prescriptions. Visit your doctor to get started.'
                    : 'No prescription history yet.'}
            </div>
        );
    }

    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence mode="popLayout">
                {prescriptions.map(prescription => (
                    <TokenCard
                        key={prescription.id}
                        prescription={prescription}
                        privacyMode={privacyMode}
                        isActive={isActive}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}
