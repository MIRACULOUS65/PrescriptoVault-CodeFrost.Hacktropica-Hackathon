"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Package,
    Search,
    Truck,
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    ArrowRight,
    Filter,
    Box
} from "lucide-react";
import { usePharmacyStore, Order } from "@/lib/stores/pharmacyStore";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function OrdersPage() {
    const orders = usePharmacyStore((state) => state.orders);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>(null);

    // Close detail view when pressing escape
    // (In a real app handling keyboard events is good practice)

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.providerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter ? order.status === statusFilter : true;
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'shipped': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'delivered': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
            default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
        }
    };

    const statusSteps = [
        { id: 'pending', label: 'Order Placed', icon: Clock },
        { id: 'confirmed', label: 'Confirmed', icon: CheckCircle2 },
        { id: 'shipped', label: 'Shipped', icon: Truck },
        { id: 'delivered', label: 'Delivered', icon: Box },
    ];

    return (
        <div className="flex bg-black min-h-screen">
            {/* Main List Area */}
            <div className={`flex-1 transition-all duration-300 ${selectedOrder ? 'mr-[400px]' : ''}`}>
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                            <Truck className="h-8 w-8" />
                            Orders & Shipments
                        </h1>
                        <p className="text-emerald-100/60 mt-1">Track incoming inventory and supplier shipments</p>
                    </div>

                    <div className="flex gap-4 items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500/50" />
                            <Input
                                placeholder="Search orders, items, or providers..."
                                className="pl-10 bg-black/40 border-emerald-500/20 text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            {['pending', 'confirmed', 'shipped', 'delivered'].map((status) => (
                                <Button
                                    key={status}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setStatusFilter(statusFilter === status ? null : status)}
                                    className={`capitalize border-emerald-500/20 ${statusFilter === status ? 'bg-emerald-500 text-black' : 'text-emerald-400'}`}
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-12 text-emerald-100/40 border border-dashed border-emerald-500/20 rounded-xl">
                                <Package className="h-12 w-12 mx-auto mb-4" />
                                <p>No orders found matching your criteria</p>
                            </div>
                        ) : (
                            filteredOrders.map((order) => (
                                <motion.div
                                    key={order.id}
                                    layoutId={`order-${order.id}`}
                                    onClick={() => setSelectedOrder(order)}
                                    className={`
                    p-4 rounded-xl border cursor-pointer transition-all duration-200 group
                    ${selectedOrder?.id === order.id
                                            ? 'bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/50'
                                            : 'bg-black/40 border-emerald-500/20 hover:bg-emerald-950/20 hover:border-emerald-500/30'}
                  `}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                                <Package className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-white text-lg">{order.itemName}</h3>
                                                    <Badge className={getStatusColor(order.status)}>
                                                        {order.status}
                                                    </Badge>
                                                </div>
                                                <p className="text-emerald-100/60 text-sm">
                                                    Order #{order.id.split('-')[1]} • {format(new Date(order.orderDate), "MMM d, yyyy")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-mono font-medium text-white">₹{order.totalCost.toFixed(2)}</p>
                                            <p className="text-sm text-emerald-100/40">{order.providerName}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Slide-over Detail Panel */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-screen w-[400px] bg-black/95 backdrop-blur-xl border-l border-emerald-500/20 p-6 overflow-y-auto z-50 shadow-2xl shadow-emerald-950/50"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-bold text-white">Tracking Details</h2>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOrder(null)}
                                className="text-emerald-100/60 hover:text-white"
                            >
                                Close
                            </Button>
                        </div>

                        <div className="space-y-8">
                            {/* Order Info */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="h-16 w-16 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                                        <Package className="h-8 w-8 text-emerald-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{selectedOrder.itemName}</h3>
                                        <p className="text-emerald-100/60 text-sm">Qty: {selectedOrder.quantity}</p>
                                        <p className="text-emerald-100/60 text-sm">Total: ₹{selectedOrder.totalCost.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                        <p className="text-xs text-emerald-100/40 mb-1">Provider</p>
                                        <p className="text-sm font-medium text-white">{selectedOrder.providerName}</p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                        <p className="text-xs text-emerald-100/40 mb-1">Estimated Delivery</p>
                                        <p className="text-sm font-medium text-white">{selectedOrder.estimatedDelivery}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div>
                                <h3 className="text-sm font-semibold text-emerald-100/40 uppercase tracking-wider mb-4">Shipment Progress</h3>
                                <div className="space-y-0 relative">
                                    {/* Vertical Line */}
                                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-emerald-500/20" />

                                    {statusSteps.map((step, idx) => {
                                        // Determine if this step is active/completed based on order status
                                        // Simple logic: if order status index >= step index
                                        const orderStatusIdx = statusSteps.findIndex(s => s.id === selectedOrder.status);
                                        const isCompleted = idx <= orderStatusIdx;
                                        const isCurrent = idx === orderStatusIdx;

                                        return (
                                            <div key={step.id} className="relative flex gap-4 pb-8 last:pb-0">
                                                <div className={`
                          relative z-10 h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                          ${isCompleted
                                                        ? 'bg-emerald-500 border-emerald-500 text-black'
                                                        : 'bg-black border-emerald-500/20 text-emerald-500/20'}
                        `}>
                                                    <step.icon className="h-5 w-5" />
                                                    {isCurrent && (
                                                        <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500/40" />
                                                    )}
                                                </div>
                                                <div className="pt-2">
                                                    <p className={`font-semibold ${isCompleted ? 'text-white' : 'text-emerald-100/40'}`}>
                                                        {step.label}
                                                    </p>
                                                    {isCompleted && (
                                                        <p className="text-xs text-emerald-100/60">
                                                            {idx === 0
                                                                ? format(new Date(selectedOrder.orderDate), "MMM d, h:mm a")
                                                                : isCurrent ? "In Progress" : "Completed"
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            {selectedOrder.status === 'shipped' && (
                                <div className="rounded-xl overflow-hidden border border-emerald-500/20 relative h-40 bg-emerald-950/30 group">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="h-8 w-8 text-emerald-400 mx-auto mb-2 animate-bounce" />
                                            <p className="text-sm text-emerald-100/60">Live Tracking Enabled</p>
                                        </div>
                                    </div>
                                    {/* Simulated Map Grid */}
                                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500 via-transparent to-transparent" />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
