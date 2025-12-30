"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { usePharmacyStore, InventoryItem, ProviderPrice } from "@/lib/stores/pharmacyStore";
import { Truck, Star, CheckCircle2, AlertCircle, TrendingDown, Clock, Loader2, DollarSign, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ReorderDialogProps {
    item: InventoryItem | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ReorderDialog({ item, open, onOpenChange }: ReorderDialogProps) {
    const [step, setStep] = useState<'searching' | 'results' | 'confirming' | 'success'>('searching');
    const [providerPrices, setProviderPrices] = useState<ProviderPrice[]>([]);
    const [selectedProvider, setSelectedProvider] = useState<ProviderPrice | null>(null);
    const [quantity, setQuantity] = useState(100);
    const [searchProgress, setSearchProgress] = useState(0);

    const getProviderPrices = usePharmacyStore((state) => state.getProviderPrices);
    const createOrder = usePharmacyStore((state) => state.createOrder);

    // Reset state when dialog opens
    useEffect(() => {
        if (open && item) {
            setStep('searching');
            setSearchProgress(0);
            setProviderPrices([]);
            setSelectedProvider(null);
            setQuantity(item.minStock * 2); // Default reorder quantity

            // Simulate searching for prices
            const duration = 2000;
            const interval = 50;
            const steps = duration / interval;
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const progress = Math.min((currentStep / steps) * 100, 100);
                setSearchProgress(progress);

                if (currentStep >= steps) {
                    clearInterval(timer);
                    const prices = getProviderPrices(item.name);
                    setProviderPrices(prices);
                    setSelectedProvider(prices[0]); // Auto-select best price
                    setStep('results');
                }
            }, interval);

            return () => clearInterval(timer);
        }
    }, [open, item, getProviderPrices]);

    const handlePlaceOrder = () => {
        if (!item || !selectedProvider) return;

        setStep('confirming');

        // Simulate order processing
        setTimeout(() => {
            createOrder({
                itemId: item.id,
                itemName: item.name,
                quantity: quantity,
                providerId: selectedProvider.providerId,
                providerName: selectedProvider.providerName,
                price: selectedProvider.price,
                totalCost: selectedProvider.price * quantity,
                estimatedDelivery: selectedProvider.deliveryTime
            });
            setStep('success');
        }, 1500);
    };

    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-black/95 backdrop-blur-3xl border-emerald-500/20 text-white max-w-3xl overflow-hidden">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center gap-2">
                        <Package className="h-6 w-6 text-emerald-400" />
                        Reorder Stock: {item.name}
                    </DialogTitle>
                    <DialogDescription className="text-emerald-100/60">
                        Compare provider prices and place restocking order
                    </DialogDescription>
                </DialogHeader>

                <div className="h-[400px] relative">
                    <AnimatePresence mode="wait">
                        {/* SEARCHING STATE */}
                        {step === 'searching' && (
                            <motion.div
                                key="searching"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-8"
                            >
                                <div className="relative">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                        className="w-24 h-24 rounded-full border-4 border-emerald-500/20 border-t-emerald-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <Truck className="h-10 w-10 text-emerald-400" />
                                    </div>
                                </div>
                                <div className="w-full max-w-md space-y-2 text-center">
                                    <h3 className="text-xl font-semibold text-white">Scanning Provider Network...</h3>
                                    <p className="text-emerald-100/60 text-sm">Finding best prices and availability in real-time</p>
                                    <Progress value={searchProgress} className="h-2 bg-emerald-950/50" indicatorClassName="bg-emerald-500" />
                                </div>
                            </motion.div>
                        )}

                        {/* RESULTS STATE */}
                        {step === 'results' && (
                            <motion.div
                                key="results"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="absolute inset-0 overflow-y-auto pr-2"
                            >
                                <div className="grid grid-cols-3 gap-6 h-full">
                                    {/* Item Details Sidebar */}
                                    <div className="col-span-1 bg-emerald-950/20 rounded-xl p-4 border border-emerald-500/10 space-y-4 h-fit">
                                        <div>
                                            <h4 className="text-sm font-medium text-emerald-100/60 mb-2">Current Stock Status</h4>
                                            <div className="flex items-end gap-2">
                                                <span className="text-3xl font-bold text-white">{item.stock}</span>
                                                <span className="text-sm text-emerald-100/40 mb-1">{item.unit}</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-emerald-950/40 rounded-full mt-2 overflow-hidden">
                                                <div
                                                    className={`h-full ${item.stock < item.minStock ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                    style={{ width: `${Math.min((item.stock / item.minStock) * 100, 100)}%` }}
                                                />
                                            </div>
                                            <p className={`text-xs mt-1 ${item.stock < item.minStock ? 'text-red-400' : 'text-emerald-400'}`}>
                                                {item.stock < item.minStock ? 'Critical Low Stock' : 'Healthy Stock Level'}
                                            </p>
                                        </div>

                                        <div className="space-y-2">
                                            <h4 className="text-sm font-medium text-emerald-100/60">Order Quantity</h4>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 border-emerald-500/20"
                                                    onClick={() => setQuantity(q => Math.max(10, q - 10))}
                                                >
                                                    -
                                                </Button>
                                                <div className="flex-1 text-center font-mono text-lg bg-black/40 py-1 rounded border border-emerald-500/10">
                                                    {quantity}
                                                </div>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8 border-emerald-500/20"
                                                    onClick={() => setQuantity(q => q + 10)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-emerald-500/10">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-sm text-emerald-100/60">Unit Price</span>
                                                <span className="text-white font-mono">₹{selectedProvider?.price.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-lg font-bold text-emerald-400">
                                                <span>Total</span>
                                                <span>₹{((selectedProvider?.price || 0) * quantity).toFixed(2)}</span>
                                            </div>
                                        </div>

                                        <Button
                                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-semibold mt-4"
                                            onClick={handlePlaceOrder}
                                            disabled={!selectedProvider}
                                        >
                                            Place Order
                                        </Button>
                                    </div>

                                    {/* Provider List */}
                                    <div className="col-span-2 space-y-3">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-semibold text-white">Best Matches</h3>
                                            <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                                                {providerPrices.length} Providers Found
                                            </Badge>
                                        </div>

                                        {providerPrices.map((provider, index) => (
                                            <motion.div
                                                key={provider.providerId}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                onClick={() => setSelectedProvider(provider)}
                                                className={`
                          relative p-4 rounded-xl border cursor-pointer transition-all duration-200
                          ${selectedProvider?.providerId === provider.providerId
                                                        ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/50'
                                                        : 'bg-black/20 border-emerald-500/10 hover:bg-emerald-950/20 hover:border-emerald-500/30'}
                        `}
                                            >
                                                {index === 0 && (
                                                    <div className="absolute -top-2.5 -right-2 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-lg shadow-emerald-500/20">
                                                        <TrendingDown className="h-3 w-3 mr-1" />
                                                        BEST PRICE
                                                    </div>
                                                )}

                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h4 className="font-medium text-white">{provider.providerName}</h4>
                                                            <div className="flex items-center text-xs text-yellow-400 bg-yellow-400/10 px-1.5 rounded">
                                                                <Star className="h-3 w-3 mr-0.5 fill-current" />
                                                                {provider.rating}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-3 mt-2 text-xs text-emerald-100/60">
                                                            <span className="flex items-center">
                                                                <Clock className="h-3 w-3 mr-1" />
                                                                {provider.deliveryTime}
                                                            </span>
                                                            {provider.inStock ? (
                                                                <span className="flex items-center text-emerald-400">
                                                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                                                    In Stock
                                                                </span>
                                                            ) : (
                                                                <span className="flex items-center text-red-400">
                                                                    <AlertCircle className="h-3 w-3 mr-1" />
                                                                    Out of Stock
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="text-xl font-bold text-white">₹{provider.price.toFixed(2)}</p>
                                                        <p className="text-xs text-emerald-100/40">per unit</p>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* CONFIRMING STATE */}
                        {step === 'confirming' && (
                            <motion.div
                                key="confirming"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                            >
                                <div className="relative mb-6">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                        className="w-20 h-20 rounded-full border-4 border-emerald-500/20 border-t-emerald-500"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <DollarSign className="h-8 w-8 text-emerald-400" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">Processing Secure Payment</h3>
                                <p className="text-emerald-100/60">Confirming availability with {selectedProvider?.providerName}...</p>
                            </motion.div>
                        )}

                        {/* SUCCESS STATE */}
                        {step === 'success' && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6"
                                >
                                    <CheckCircle2 className="h-12 w-12 text-emerald-400" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h3>
                                <p className="text-emerald-100/60 max-w-sm mx-auto mb-8">
                                    Your order for <span className="text-white font-medium">{quantity} units</span> of <span className="text-white font-medium">{item.name}</span> has been placed successfully.
                                </p>
                                <Button
                                    className="bg-emerald-500 hover:bg-emerald-400 text-black px-8"
                                    onClick={() => onOpenChange(false)}
                                >
                                    Return to Inventory
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </DialogContent>
        </Dialog>
    );
}
