"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Building2,
    Users,
    Activity,
    Shield,
    Search,
    MoreVertical,
    Stethoscope,
    Pill,
    ArrowUpRight,
    ArrowDownLeft,
    AlertTriangle,
    CheckCircle2,
    Clock
} from "lucide-react";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("tenants");

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Shield className="h-8 w-8" />
                    Admin Panel
                </h1>
                <p className="text-emerald-100/60 mt-1">Network management and analytics</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Active Doctors", value: "342", icon: Stethoscope, color: "text-blue-400", bg: "bg-blue-500/10" },
                    { label: "Active Patients", value: "8921", icon: Users, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                    { label: "Pharmacies", value: "156", icon: Building2, color: "text-purple-400", bg: "bg-purple-500/10" },
                    { label: "Uptime", value: "99.97%", icon: Activity, color: "text-orange-400", bg: "bg-orange-500/10" },
                ].map((stat, idx) => (
                    <Card key={idx} className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={`h-12 w-12 rounded-lg ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{stat.value}</p>
                                <p className="text-sm text-emerald-100/40">{stat.label}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Areas */}
            <Tabs defaultValue="tenants" className="w-full" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-black/40 border border-emerald-500/20 text-emerald-100/60">
                        <TabsTrigger value="tenants" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                            <Building2 className="h-4 w-4 mr-2" />
                            Tenants
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                            <Activity className="h-4 w-4 mr-2" />
                            Analytics
                        </TabsTrigger>
                        <TabsTrigger value="audit" className="data-[state=active]:bg-emerald-950/50 data-[state=active]:text-emerald-400">
                            <Shield className="h-4 w-4 mr-2" />
                            Audit Log
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* TENANTS TAB */}
                <TabsContent value="tenants" className="space-y-6 mt-0">
                    {/* Registered Clinics */}
                    <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                <Stethoscope className="h-5 w-5 text-emerald-400" />
                                Registered Clinics
                            </CardTitle>
                            <CardDescription className="text-emerald-100/40">Active healthcare providers on the network</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { name: "Dr. Priya Sharma", clinic: "MedCare Clinic, Mumbai", type: "clinic starter" },
                                { name: "Dr. Rajesh Kumar", clinic: "Heart Care Hospital, Delhi", type: "enterprise" },
                                { name: "Dr. Anita Desai", clinic: "City Health Center, Bangalore", type: "clinic starter" },
                            ].map((clinic, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-emerald-950/10 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                                    <div>
                                        <h4 className="font-semibold text-white">{clinic.name}</h4>
                                        <p className="text-sm text-emerald-100/40">{clinic.clinic}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-black text-emerald-100/60 border-emerald-500/20 capitalize">
                                        {clinic.type}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {/* Registered Pharmacies */}
                    <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-emerald-400" />
                                Registered Pharmacies
                            </CardTitle>
                            <CardDescription className="text-emerald-100/40">Active pharmacy nodes on the network</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {[
                                { name: "Apollo Pharmacy", location: "MG Road, Mumbai", stats: "1247 dispensed" },
                                { name: "MedPlus", location: "Connaught Place, New Delhi", stats: "892 dispensed" },
                                { name: "Wellness Forever", location: "Indiranagar, Bangalore", stats: "456 dispensed" },
                            ].map((pharmacy, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-emerald-950/10 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                                    <div>
                                        <h4 className="font-semibold text-white">{pharmacy.name}</h4>
                                        <p className="text-sm text-emerald-100/40">{pharmacy.location}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                        {pharmacy.stats}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ANALYTICS TAB */}
                <TabsContent value="analytics" className="mt-0">
                    <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20 h-[400px] flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <div className="relative mx-auto w-24 h-24">
                                <Activity className="h-24 w-24 text-emerald-500/20 animate-pulse" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="h-2 w-2 bg-emerald-500 rounded-full animate-ping" />
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-white">Network Analytics</h3>
                                <p className="text-emerald-100/40">Prescription activity across the network</p>
                                <div className="mt-4 flex gap-4 text-sm text-emerald-100/60 justify-center">
                                    <span>Total minted: 15847</span>
                                    <span>|</span>
                                    <span>Total dispensed: 14293</span>
                                </div>
                            </div>
                            <Badge variant="outline" className="border-emerald-500/20 text-emerald-400 bg-emerald-500/5 mt-4">
                                Analytics visualization coming soon
                            </Badge>
                        </div>
                    </Card>
                </TabsContent>

                {/* AUDIT LOG TAB */}
                <TabsContent value="audit" className="mt-0">
                    <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardHeader>
                            <CardTitle className="text-white">Audit Log</CardTitle>
                            <CardDescription className="text-emerald-100/40">Immutable record of all mint and burn events</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { type: "mint", title: "Token Minted", hash: "0x8f7e6d5c4b3a2910...", time: "12/28/2024, 10:30:00 AM", block: "#45892341", id: "ASA-9921" },
                                { type: "mint", title: "Token Minted", hash: "0x7e6d5c4b3a291087...", time: "12/25/2024, 2:15:00 PM", block: "#45890123", id: "ASA-9920" },
                                { type: "burn", title: "Token Burned", hash: "0x5c4b3a2910876543...", time: "12/25/2024, 4:30:00 PM", block: "#45890456", id: "ASA-9920" },
                                { type: "mint", title: "Token Minted", hash: "0x4b3a291087654321...", time: "12/24/2024, 9:15:00 AM", block: "#45889100", id: "ASA-9919" },
                            ].map((log, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-emerald-500/10">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${log.type === 'mint' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-orange-500/10 text-orange-400'}`}>
                                            {log.type === 'mint' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{log.title}</h4>
                                            <p className="font-mono text-xs text-emerald-100/40">{log.hash}</p>
                                            <div className="flex items-center gap-2 mt-1 text-xs text-emerald-100/40">
                                                <Clock className="h-3 w-3" />
                                                {log.time}
                                                <span className="mx-1">•</span>
                                                Block {log.block}
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="border-emerald-500/20 text-white font-mono bg-emerald-950/30">
                                        {log.id}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Floating Action Button for Emergency */}
            <div className="fixed bottom-6 right-6">
                <Button variant="destructive" className="rounded-full shadow-lg shadow-red-900/20 px-4 py-6 h-auto flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span className="font-semibold">1 Issue</span>
                    <span className="ml-1 bg-white/20 px-1.5 py-0.5 rounded text-xs">x</span>
                </Button>
            </div>
        </div>
    );
}
