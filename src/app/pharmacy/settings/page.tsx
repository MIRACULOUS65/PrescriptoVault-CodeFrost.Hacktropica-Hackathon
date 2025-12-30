"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Building2, Mail, Phone, MapPin, Shield, Server, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-emerald-100/60 mt-1">Manage your pharmacy settings</p>
            </div>

            {/* Pharmacy Information */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        Pharmacy Information
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Update your pharmacy details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-emerald-100/80">Pharmacy Name</Label>
                            <Input
                                id="name"
                                defaultValue="Apollo Pharmacy"
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="license" className="text-emerald-100/80">License Number</Label>
                            <Input
                                id="license"
                                defaultValue="PH-MH-2024-12345"
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-emerald-100/80">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    defaultValue="apollo.mgroad@pharmacy.in"
                                    className="pl-10 bg-emerald-950/20 border-emerald-500/20 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="text-emerald-100/80">Phone</Label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                                <Input
                                    id="phone"
                                    defaultValue="+91 22 1234 5678"
                                    className="pl-10 bg-emerald-950/20 border-emerald-500/20 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address" className="text-emerald-100/80">Address</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                                <Input
                                    id="address"
                                    defaultValue="MG Road, Mumbai, Maharashtra 400001"
                                    className="pl-10 bg-emerald-950/20 border-emerald-500/20 text-white"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Node Settings */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        Validator Node
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Blockchain node configuration
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Node Status</p>
                            <p className="text-sm text-emerald-100/60">Validator node is active and synced</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-emerald-400 font-semibold">Online</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Auto-Verify</p>
                            <p className="text-sm text-emerald-100/60">Automatically verify incoming prescriptions</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="nodeId" className="text-emerald-100/80">Node ID</Label>
                        <Input
                            id="nodeId"
                            defaultValue="NODE-APOLLO-MH-001"
                            disabled
                            className="bg-emerald-950/20 border-emerald-500/20 text-white opacity-60 font-mono"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Manage security settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-emerald-100/60">Add an extra layer of security</p>
                        </div>
                        <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Require PIN for Dispensing</p>
                            <p className="text-sm text-emerald-100/60">Require PIN confirmation before dispensing</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="pt-4">
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-400">
                            Change Password
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
