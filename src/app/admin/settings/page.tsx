"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings, Save, Bell, Globe, Shield } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Settings className="h-8 w-8" />
                    Settings
                </h1>
                <p className="text-emerald-100/60 mt-1">Configure platform-wide parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Settings */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Globe className="h-5 w-5" />
                            General Configuration
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-white">Platform Name</Label>
                            <Input defaultValue="PrescriptoVault" className="bg-emerald-950/20 border-emerald-500/20 text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-white">Support Email</Label>
                            <Input defaultValue="admin@prescripto.com" className="bg-emerald-950/20 border-emerald-500/20 text-white" />
                        </div>
                        <div className="flex items-center justify-between pt-2">
                            <span className="text-emerald-100/60">Maintenance Mode</span>
                            <Switch />
                        </div>
                    </CardContent>
                </Card>

                {/* Security Policy */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            Security Policy
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-white">Require 2FA for Admins</span>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white">Log All API Requests</span>
                            <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-white">Auto-Lock Idle Sessions</span>
                            <Switch defaultChecked />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-end">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
}
