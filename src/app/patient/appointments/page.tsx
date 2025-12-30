"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Video, User } from "lucide-react";

const mockAppointments = [
    {
        id: "1",
        doctor: "Dr. Priya Sharma",
        specialty: "General Physician",
        date: "Monday, Dec 30",
        time: "11:00 AM",
        duration: "30 min",
        type: "checkup",
        status: "scheduled",
        location: "MedCare Clinic, Mumbai"
    },
    {
        id: "2",
        doctor: "Dr. Rajesh Kumar",
        specialty: "Cardiologist",
        date: "Friday, Jan 3",
        time: "2:00 PM",
        duration: "45 min",
        type: "consultation",
        status: "scheduled",
        location: "Online"
    },
    {
        id: "3",
        doctor: "Dr. Priya Sharma",
        specialty: "General Physician",
        date: "Friday, Dec 15",
        time: "10:00 AM",
        duration: "30 min",
        type: "follow-up",
        status: "completed",
        location: "MedCare Clinic, Mumbai"
    }
];

export default function AppointmentsPage() {
    const upcoming = mockAppointments.filter(a => a.status === "scheduled");
    const past = mockAppointments.filter(a => a.status === "completed");

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Calendar className="h-8 w-8" />
                    Appointments
                </h1>
                <p className="text-emerald-100/60 mt-1">Manage your doctor appointments</p>
            </div>

            {/* Upcoming Appointments */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Upcoming</h2>
                <div className="space-y-4">
                    {upcoming.map((apt) => (
                        <Card key={apt.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <User className="h-6 w-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{apt.doctor}</p>
                                            <p className="text-sm text-emerald-100/60">{apt.specialty}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                        {apt.type}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-emerald-100/60">
                                        <Calendar className="h-4 w-4" />
                                        {apt.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-emerald-100/60">
                                        <Clock className="h-4 w-4" />
                                        {apt.time} ({apt.duration})
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-emerald-100/60">
                                        {apt.location === "Online" ? (
                                            <>
                                                <Video className="h-4 w-4" />
                                                {apt.location}
                                            </>
                                        ) : (
                                            <>
                                                <MapPin className="h-4 w-4" />
                                                {apt.location}
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="border-emerald-500/30 text-emerald-400">
                                        Reschedule
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-red-500/30 text-red-400">
                                        Cancel
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Past Appointments */}
            <div>
                <h2 className="text-xl font-semibold text-white mb-4">Past Appointments</h2>
                <div className="space-y-4">
                    {past.map((apt) => (
                        <Card key={apt.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20 opacity-60">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                            <User className="h-6 w-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-white">{apt.doctor}</p>
                                            <p className="text-sm text-emerald-100/60">{apt.specialty}</p>
                                            <p className="text-xs text-emerald-100/40 mt-1">{apt.date} • {apt.time}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                        {apt.status}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
