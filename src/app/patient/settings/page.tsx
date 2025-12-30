"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { User, Mail, Phone, Shield, Lock, Eye, Save, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.clear();
        router.push('/');
    };

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
                                defaultValue="Amit Patel"
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
                                    defaultValue="amit.patel@email.com"
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
                            <Label htmlFor="dob" className="text-emerald-100/80">Date of Birth</Label>
                            <Input
                                id="dob"
                                type="date"
                                defaultValue="1985-05-15"
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
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

            {/* Privacy Settings */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Privacy
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Control who can access your health data
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Share Health Score</p>
                            <p className="text-sm text-emerald-100/60">Allow doctors to view your health score</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Share Medical History</p>
                            <p className="text-sm text-emerald-100/60">Share your medical history with new doctors</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Anonymous Analytics</p>
                            <p className="text-sm text-emerald-100/60">Help improve the platform with anonymous data</p>
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
                        <Label htmlFor="wallet" className="text-emerald-100/80">Wallet Address</Label>
                        <Input
                            id="wallet"
                            defaultValue="ALGO...XYZ1"
                            disabled
                            className="bg-emerald-950/20 border-emerald-500/20 text-white opacity-60 font-mono"
                        />
                        <p className="text-xs text-emerald-100/40">Your blockchain wallet address</p>
                    </div>
                    <div className="pt-4 space-y-2">
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-400 w-full md:w-auto">
                            <Lock className="h-4 w-4 mr-2" />
                            Change Password
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Logout Section */}
            <Card className="bg-black/40 backdrop-blur-xl border-red-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <LogOut className="h-5 w-5 text-red-400" />
                        Logout
                    </CardTitle>
                    <CardDescription className="text-emerald-100/40">
                        Sign out of your account and return to homepage
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold"
                    >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout from Patient Portal
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
