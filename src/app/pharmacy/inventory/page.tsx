"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, AlertTriangle, TrendingDown, ArrowUpRight, TrendingUp, Filter } from "lucide-react";
import { usePharmacyStore, InventoryItem } from "@/lib/stores/pharmacyStore";
import { AddInventoryDialog } from "@/components/pharmacy/AddInventoryDialog";
import { ReorderDialog } from "@/components/pharmacy/ReorderDialog";
import { motion, AnimatePresence } from "framer-motion";

export default function InventoryPage() {
    const inventory = usePharmacyStore((state) => state.inventory);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [reorderItem, setReorderItem] = useState<InventoryItem | null>(null);
    const [isReorderOpen, setIsReorderOpen] = useState(false);

    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.genericName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const lowStockItems = inventory.filter(item => item.stock < item.minStock);
    const categories = Array.from(new Set(inventory.map(item => item.category)));

    const handleReorder = (item: InventoryItem) => {
        setReorderItem(item);
        setIsReorderOpen(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Package className="h-8 w-8" />
                        Inventory Management
                    </h1>
                    <p className="text-emerald-100/60 mt-1">Real-time stock tracking & automated reordering</p>
                </div>
                <AddInventoryDialog />
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100/60 text-sm">Total Items</p>
                            <p className="text-3xl font-bold text-white">{inventory.length}</p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-emerald-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-emerald-100/60 text-sm">Total Valuation</p>
                            <p className="text-3xl font-bold text-emerald-400">
                                ₹{inventory.reduce((acc, item) => acc + (item.stock * item.price), 0).toFixed(0)}
                            </p>
                        </div>
                        <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-emerald-400" />
                        </div>
                    </CardContent>
                </Card>
                <Card className={`bg-black/40 backdrop-blur-xl border ${lowStockItems.length > 0 ? 'border-red-500/30' : 'border-emerald-500/20'}`}>
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className={`${lowStockItems.length > 0 ? 'text-red-400' : 'text-emerald-100/60'} text-sm`}>Low Stock Alerts</p>
                            <p className={`text-3xl font-bold ${lowStockItems.length > 0 ? 'text-red-500' : 'text-white'}`}>{lowStockItems.length}</p>
                        </div>
                        <div className={`h-12 w-12 rounded-full ${lowStockItems.length > 0 ? 'bg-red-500/10' : 'bg-emerald-500/10'} flex items-center justify-center`}>
                            <AlertTriangle className={`h-6 w-6 ${lowStockItems.length > 0 ? 'text-red-400' : 'text-emerald-400'}`} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Controls */}
            <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500/50" />
                    <Input
                        placeholder="Search by name, generic name..."
                        className="pl-10 bg-black/40 border-emerald-500/20 text-white focus:border-emerald-500/50"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <Button
                        variant="outline"
                        size="sm"
                        className={`border-emerald-500/20 ${selectedCategory === null ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'text-emerald-400 hover:bg-emerald-950/30'}`}
                        onClick={() => setSelectedCategory(null)}
                    >
                        All
                    </Button>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            variant="outline"
                            size="sm"
                            className={`whitespace-nowrap border-emerald-500/20 ${selectedCategory === cat ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'text-emerald-400 hover:bg-emerald-950/30'}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Inventory Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <AnimatePresence>
                    {filteredInventory.map((item) => {
                        const isLowStock = item.stock < item.minStock;
                        const stockPercent = Math.min((item.stock / item.minStock) * 100, 100);

                        return (
                            <motion.div
                                layout
                                key={item.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Card className={`h-full bg-black/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-500/5 ${isLowStock ? 'border-red-500/30' : 'border-emerald-500/20'}`}>
                                    <CardContent className="p-6 h-full flex flex-col">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="font-semibold text-white text-lg">{item.name}</p>
                                                    <Badge variant="outline" className="text-xs border-emerald-500/20 text-emerald-100/40">
                                                        {item.category}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-emerald-100/60">{item.genericName}</p>
                                            </div>
                                            {isLowStock && (
                                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 animate-pulse">
                                                    Low Stock
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="space-y-4 flex-1">
                                            <div className="grid grid-cols-2 gap-4 py-2 border-y border-emerald-500/10">
                                                <div>
                                                    <p className="text-xs text-emerald-100/40 mb-1">Stock</p>
                                                    <p className={`font-mono font-bold text-lg ${isLowStock ? 'text-red-400' : 'text-white'}`}>
                                                        {item.stock} <span className="text-xs font-normal text-emerald-100/40">{item.unit}</span>
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs text-emerald-100/40 mb-1">Price</p>
                                                    <p className="font-mono font-bold text-lg text-white">₹{item.price.toFixed(2)}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex justify-between text-xs mb-1.5">
                                                    <span className={isLowStock ? 'text-red-400' : 'text-emerald-100/60'}>
                                                        Level: {Math.round(stockPercent)}%
                                                    </span>
                                                    <span className="text-emerald-100/40">Min: {item.minStock}</span>
                                                </div>
                                                <div className="w-full h-2 bg-emerald-950/40 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${stockPercent}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className={`h-full rounded-full ${isLowStock ? 'bg-red-500' : 'bg-emerald-500'}`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-6 pt-2">
                                            <Button
                                                className={`flex-1 ${isLowStock ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-emerald-500 hover:bg-emerald-400 text-black'}`}
                                                onClick={() => handleReorder(item)}
                                            >
                                                <ArrowUpRight className="h-4 w-4 mr-2" />
                                                Reorder
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>

            {/* Reorder Dialog */}
            <ReorderDialog
                item={reorderItem}
                open={isReorderOpen}
                onOpenChange={setIsReorderOpen}
            />
        </div>
    );
}
