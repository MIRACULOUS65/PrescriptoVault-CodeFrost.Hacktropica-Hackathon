"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, Building2, Bell, Shield, Save } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-emerald-100/60 mt-1">Manage your account and preferences</p>
            </div>

            {/* Profile Settings */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Information
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Update your personal details
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-emerald-100/80">Full Name</Label>
                            <Input
                                id="name"
                                defaultValue="Dr. Priya Sharma"
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
                                    defaultValue="priya.sharma@medclinic.in"
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
                                    defaultValue="+91 98765 43210"
                                    className="pl-10 bg-emerald-950/20 border-emerald-500/20 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="clinic" className="text-emerald-100/80">Clinic</Label>
                            <div className="relative">
                                <Building2 className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                                <Input
                                    id="clinic"
                                    defaultValue="MedCare Clinic, Mumbai"
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

            {/* Notification Settings */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Notifications
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Manage your notification preferences
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-sm text-emerald-100/60">Receive email updates about appointments</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Appointment Reminders</p>
                            <p className="text-sm text-emerald-100/60">Get reminded about upcoming appointments</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">New Prescription Alerts</p>
                            <p className="text-sm text-emerald-100/60">Notifications when prescriptions are dispensed</p>
                        </div>
                        <Switch />
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
                        Manage your security settings
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="license" className="text-emerald-100/80">Medical License Number</Label>
                        <Input
                            id="license"
                            defaultValue="MCI-2019-12345"
                            disabled
                            className="bg-emerald-950/20 border-emerald-500/20 text-white opacity-60"
                        />
                        <p className="text-xs text-emerald-100/40">Contact support to update your license number</p>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="wallet" className="text-emerald-100/80">Wallet Address</Label>
                        <Input
                            id="wallet"
                            defaultValue="ALGO...XYZ1"
                            disabled
                            className="bg-emerald-950/20 border-emerald-500/20 text-white opacity-60 font-mono"
                        />
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
