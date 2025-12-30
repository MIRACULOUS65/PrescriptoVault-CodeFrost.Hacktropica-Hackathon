"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDoctorStats, mockAppointments, mockPrescriptions } from "@/lib/mockData/doctor";
import { FileText, Users, Calendar, Activity, TrendingUp, Clock, Plus } from "lucide-react";
import Link from "next/link";

export default function DoctorDashboard() {
    const stats = mockDoctorStats;
    const upcomingAppointments = mockAppointments.filter(a => a.status === "scheduled").slice(0, 3);
    const recentPrescriptions = mockPrescriptions.slice(0, 3);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Clinical Suite</h1>
                <p className="text-emerald-100/60 mt-1">Welcome back, Dr. Priya Sharma</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Total Patients</CardTitle>
                        <Users className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.totalPatients}</div>
                        <p className="text-xs text-emerald-100/40 mt-1">Active patients</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Prescriptions</CardTitle>
                        <FileText className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.prescriptionsThisMonth}</div>
                        <p className="text-xs text-emerald-100/40 mt-1">This month</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Appointments</CardTitle>
                        <Calendar className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.appointmentsThisMonth}</div>
                        <p className="text-xs text-emerald-100/40 mt-1">{stats.completedAppointments} completed</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Patient Adherence</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.patientAdherence}%</div>
                        <p className="text-xs text-emerald-100/40 mt-1">Average rate</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-3">
                    <Link href="/doctor/prescriptions">
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                            <Plus className="h-4 w-4 mr-2" />
                            New Prescription
                        </Button>
                    </Link>
                    <Link href="/doctor/patients">
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30">
                            <Users className="h-4 w-4 mr-2" />
                            View Patients
                        </Button>
                    </Link>
                    <Link href="/doctor/appointments">
                        <Button variant="outline" className="border-emerald-500/30 text-emerald-400 hover:bg-emerald-950/30">
                            <Calendar className="h-4 w-4 mr-2" />
                            Schedule Appointment
                        </Button>
                    </Link>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upcoming Appointments */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white">Upcoming Appointments</CardTitle>
                        <CardDescription className="text-emerald-100/40">Next 3 scheduled appointments</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {upcomingAppointments.map((apt) => (
                            <div key={apt.id} className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                <div className="flex-1">
                                    <p className="font-medium text-white">{apt.patientName}</p>
                                    <p className="text-sm text-emerald-100/60">{apt.reason}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-emerald-400">{apt.time}</p>
                                    <p className="text-xs text-emerald-100/40">{new Date(apt.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        <Link href="/doctor/appointments">
                            <Button variant="ghost" className="w-full text-emerald-400 hover:bg-emerald-950/30">
                                View All Appointments
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                {/* Recent Prescriptions */}
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white">Recent Prescriptions</CardTitle>
                        <CardDescription className="text-emerald-100/40">Latest prescriptions issued</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recentPrescriptions.map((rx) => (
                            <div key={rx.id} className="flex items-center justify-between p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/10">
                                <div className="flex-1">
                                    <p className="font-medium text-white">{rx.patientName}</p>
                                    <p className="text-sm text-emerald-100/60">{rx.diagnosis}</p>
                                </div>
                                <div className="text-right">
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                        {rx.status}
                                    </Badge>
                                    <p className="text-xs text-emerald-100/40 mt-1">{new Date(rx.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                        <Link href="/doctor/prescriptions">
                            <Button variant="ghost" className="w-full text-emerald-400 hover:bg-emerald-950/30">
                                View All Prescriptions
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
