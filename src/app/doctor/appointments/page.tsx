"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockAppointments } from "@/lib/mockData/doctor";
import { ScheduleAppointmentDialog } from "@/components/doctor/ScheduleAppointmentDialog";
import { Calendar, Clock, User } from "lucide-react";

export default function AppointmentsPage() {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "scheduled": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "completed": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "cancelled": return "bg-red-500/20 text-red-400 border-red-500/30";
            default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "consultation": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
            case "follow-up": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
            case "emergency": return "bg-red-500/20 text-red-400 border-red-500/30";
            case "checkup": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Appointments</h1>
                    <p className="text-emerald-100/60 mt-1">Manage your schedule</p>
                </div>
                <ScheduleAppointmentDialog />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {mockAppointments.map((apt) => (
                    <Card key={apt.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                        <CardHeader>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                    <User className="h-5 w-5 text-emerald-400" />
                                </div>
                                <div>
                                    <CardTitle className="text-white text-base">{apt.patientName}</CardTitle>
                                    <p className="text-xs text-emerald-100/60">{apt.reason}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Badge className={getStatusColor(apt.status)}>
                                    {apt.status}
                                </Badge>
                                <Badge className={getTypeColor(apt.type)}>
                                    {apt.type}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-emerald-100/60">
                                <Calendar className="h-4 w-4" />
                                {new Date(apt.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-emerald-100/60">
                                <Clock className="h-4 w-4" />
                                {apt.time} ({apt.duration} min)
                            </div>
                            <Button size="sm" variant="outline" className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30" onClick={() => alert(`Appointment Details:\n\nPatient: ${apt.patientName}\nDate: ${new Date(apt.date).toLocaleDateString()}\nTime: ${apt.time}\nReason: ${apt.reason}\nType: ${apt.type}\nStatus: ${apt.status}`)}>
                                View Details
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
