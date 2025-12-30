"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Bell, Pill, Calendar, Clock, Plus } from "lucide-react";

const mockReminders = [
    {
        id: "1",
        type: "medication",
        title: "Metformin",
        description: "500mg - Twice daily",
        times: ["9:00 AM", "9:00 PM"],
        enabled: true
    },
    {
        id: "2",
        type: "medication",
        title: "Lisinopril",
        description: "10mg - Once daily",
        times: ["9:00 AM"],
        enabled: true
    },
    {
        id: "3",
        type: "appointment",
        title: "Dr. Sharma Checkup",
        description: "Monday, Dec 30 at 11:00 AM",
        times: ["1 hour before"],
        enabled: true
    }
];

export default function RemindersPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                        <Bell className="h-8 w-8" />
                        Reminders
                    </h1>
                    <p className="text-emerald-100/60 mt-1">Never miss a dose or appointment</p>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reminder
                </Button>
            </div>

            {/* Medication Reminders */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Pill className="h-5 w-5" />
                        Medication Reminders
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockReminders.filter(r => r.type === "medication").map((reminder) => (
                        <div key={reminder.id} className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-white">{reminder.title}</p>
                                    <p className="text-sm text-emerald-100/60">{reminder.description}</p>
                                </div>
                                <Switch defaultChecked={reminder.enabled} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {reminder.times.map((time, idx) => (
                                    <Badge key={idx} className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {time}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Appointment Reminders */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Appointment Reminders
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {mockReminders.filter(r => r.type === "appointment").map((reminder) => (
                        <div key={reminder.id} className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <p className="font-semibold text-white">{reminder.title}</p>
                                    <p className="text-sm text-emerald-100/60">{reminder.description}</p>
                                </div>
                                <Switch defaultChecked={reminder.enabled} />
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {reminder.times.map((time, idx) => (
                                    <Badge key={idx} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                        <Bell className="h-3 w-3 mr-1" />
                                        {time}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Push Notifications</p>
                            <p className="text-sm text-emerald-100/60">Receive notifications on your device</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">Email Notifications</p>
                            <p className="text-sm text-emerald-100/60">Get reminders via email</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-white font-medium">SMS Notifications</p>
                            <p className="text-sm text-emerald-100/60">Receive text message reminders</p>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
