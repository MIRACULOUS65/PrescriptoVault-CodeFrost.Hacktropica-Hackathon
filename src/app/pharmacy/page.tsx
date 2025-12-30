"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Package, CheckCircle, TrendingUp, Truck, Clock, CheckCircle2 } from "lucide-react";
import { usePharmacyStore } from "@/lib/stores/pharmacyStore";
import { formatDistanceToNow } from "date-fns";

export default function PharmacyDashboard() {
    const orders = usePharmacyStore((state) => state.orders);

    // Stats calculation
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'confirmed').length;
    const totalSpent = orders.reduce((acc, order) => acc + order.totalCost, 0);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Building2 className="h-8 w-8" />
                    Pharmacy Node
                </h1>
                <p className="text-emerald-100/60 mt-1">Apollo Pharmacy • MG Road, Mumbai</p>
            </div>

            {/* Status Badges */}
            <div className="flex items-center gap-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                    Online
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
                    Validator Node Active
                </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100/40 text-sm mb-1">Total Orders</p>
                                <p className="text-4xl font-bold text-white">{totalOrders}</p>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <Package className="h-7 w-7 text-emerald-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100/40 text-sm mb-1">Pending Delivery</p>
                                <p className="text-4xl font-bold text-white">{pendingOrders}</p>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Truck className="h-7 w-7 text-blue-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-emerald-100/40 text-sm mb-1">Total Spent</p>
                                <p className="text-4xl font-bold text-white">₹{totalSpent.toFixed(0)}</p>
                            </div>
                            <div className="h-14 w-14 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <TrendingUp className="h-7 w-7 text-purple-400" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                    className="h-auto p-6 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 text-white justify-start"
                    onClick={() => window.location.href = '/pharmacy/verify'}
                >
                    <CheckCircle className="h-6 w-6 mr-3 text-emerald-400" />
                    <div className="text-left">
                        <p className="font-semibold text-lg">Verify Prescription</p>
                        <p className="text-xs text-emerald-100/60">Scan or enter token ID to verify</p>
                    </div>
                </Button>
                <Button
                    className="h-auto p-6 bg-emerald-950/30 hover:bg-emerald-950/50 border border-emerald-500/20 text-white justify-start"
                    onClick={() => window.location.href = '/pharmacy/inventory'}
                >
                    <Package className="h-6 w-6 mr-3 text-emerald-400" />
                    <div className="text-left">
                        <p className="font-semibold text-lg">Manage Inventory</p>
                        <p className="text-xs text-emerald-100/60">Update stock levels & reorder</p>
                    </div>
                </Button>
            </div>

            {/* Recent Orders */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Recent Orders
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {orders.length === 0 ? (
                        <div className="text-center py-8 text-emerald-100/40">
                            No recent orders found
                        </div>
                    ) : (
                        orders.slice(0, 5).map((order) => (
                            <div key={order.id} className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                                            {order.itemName.substring(0, 1)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{order.itemName}</p>
                                            <p className="text-sm text-emerald-100/60">
                                                {order.quantity} units • From {order.providerName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge className={`
                      ${order.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''}
                      ${order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : ''}
                      ${order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : ''}
                    `}>
                                            {order.status === 'confirmed' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                            {order.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                                            {order.status === 'shipped' && <Truck className="h-3 w-3 mr-1" />}
                                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                        </Badge>
                                        <p className="text-xs text-emerald-100/40 mt-1">
                                            {new Date(order.orderDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
