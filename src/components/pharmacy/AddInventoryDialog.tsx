"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePharmacyStore } from "@/lib/stores/pharmacyStore";
import { Plus, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function AddInventoryDialog() {
    const [open, setOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const addInventoryItem = usePharmacyStore((state) => state.addInventoryItem);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        addInventoryItem({
            name: formData.get("name") as string,
            genericName: formData.get("genericName") as string,
            stock: parseInt(formData.get("stock") as string),
            minStock: parseInt(formData.get("minStock") as string),
            unit: formData.get("unit") as string,
            price: parseFloat(formData.get("price") as string),
            category: formData.get("category") as string
        });

        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            setOpen(false);
            e.currentTarget.reset();
        }, 1500);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Item
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-emerald-500/20 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Add New Inventory Item</DialogTitle>
                    <DialogDescription className="text-emerald-100/60">
                        Add a new medication to your pharmacy inventory
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    {showSuccess ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="py-12 flex flex-col items-center justify-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: 360 }}
                                transition={{ type: "spring", duration: 0.6 }}
                                className="h-20 w-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4"
                            >
                                <Sparkles className="h-10 w-10 text-emerald-400" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-2xl font-bold text-emerald-400"
                            >
                                Item Added Successfully!
                            </motion.h3>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleSubmit}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Brand Name *</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        required
                                        className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        placeholder="Metformin"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="genericName">Generic Name *</Label>
                                    <Input
                                        id="genericName"
                                        name="genericName"
                                        required
                                        className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        placeholder="Metformin HCl"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="stock">Current Stock *</Label>
                                    <Input
                                        id="stock"
                                        name="stock"
                                        type="number"
                                        required
                                        min="0"
                                        className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        placeholder="100"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="minStock">Min. Stock *</Label>
                                    <Input
                                        id="minStock"
                                        name="minStock"
                                        type="number"
                                        required
                                        min="0"
                                        className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        placeholder="50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unit *</Label>
                                    <Select name="unit" required>
                                        <SelectTrigger className="bg-emerald-950/20 border-emerald-500/20 text-white">
                                            <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black border-emerald-500/20">
                                            <SelectItem value="tablets">Tablets</SelectItem>
                                            <SelectItem value="capsules">Capsules</SelectItem>
                                            <SelectItem value="bottles">Bottles</SelectItem>
                                            <SelectItem value="boxes">Boxes</SelectItem>
                                            <SelectItem value="syringes">Syringes</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price per Unit (₹) *</Label>
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        min="0"
                                        className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        placeholder="0.15"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category *</Label>
                                    <Select name="category" required>
                                        <SelectTrigger className="bg-emerald-950/20 border-emerald-500/20 text-white">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-black border-emerald-500/20">
                                            <SelectItem value="Antibiotic">Antibiotic</SelectItem>
                                            <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                                            <SelectItem value="Cardiovascular">Cardiovascular</SelectItem>
                                            <SelectItem value="Diabetes">Diabetes</SelectItem>
                                            <SelectItem value="Gastrointestinal">Gastrointestinal</SelectItem>
                                            <SelectItem value="Respiratory">Respiratory</SelectItem>
                                            <SelectItem value="Other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-emerald-500/30 text-emerald-400">
                                    Cancel
                                </Button>
                                <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Item
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
