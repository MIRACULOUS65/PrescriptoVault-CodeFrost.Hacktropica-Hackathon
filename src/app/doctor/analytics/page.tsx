"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockDoctorStats, mockTimeSeriesData } from "@/lib/mockData/doctor";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Users, FileText, Calendar, Activity } from "lucide-react";

export default function AnalyticsPage() {
    const stats = mockDoctorStats;

    const categoryData = [
        { name: "Consultations", value: 45 },
        { name: "Follow-ups", value: 30 },
        { name: "Checkups", value: 15 },
        { name: "Emergency", value: 10 }
    ];

    const COLORS = ["#10b981", "#3b82f6", "#8b5cf6", "#ef4444"];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Analytics</h1>
                <p className="text-emerald-100/60 mt-1">Track your performance and insights</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Avg. Consultation</CardTitle>
                        <Activity className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.averageConsultationTime} min</div>
                        <p className="text-xs text-emerald-100/40 mt-1">Per patient</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Revenue</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">₹{(stats.revenueThisMonth / 1000).toFixed(0)}K</div>
                        <p className="text-xs text-emerald-100/40 mt-1">This month</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Completion Rate</CardTitle>
                        <Calendar className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">
                            {Math.round((stats.completedAppointments / stats.appointmentsThisMonth) * 100)}%
                        </div>
                        <p className="text-xs text-emerald-100/40 mt-1">Appointments</p>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-emerald-100/60">Active Patients</CardTitle>
                        <Users className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.totalPatients}</div>
                        <p className="text-xs text-emerald-100/40 mt-1">Total registered</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white">Monthly Trends</CardTitle>
                        <CardDescription className="text-emerald-100/40">Prescriptions and appointments over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={mockTimeSeriesData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                                <XAxis dataKey="date" stroke="#10b981" opacity={0.6} />
                                <YAxis stroke="#10b981" opacity={0.6} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#000", border: "1px solid #10b981", borderRadius: "8px" }}
                                    labelStyle={{ color: "#10b981" }}
                                />
                                <Line type="monotone" dataKey="prescriptions" stroke="#10b981" strokeWidth={2} />
                                <Line type="monotone" dataKey="appointments" stroke="#3b82f6" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                    <CardHeader>
                        <CardTitle className="text-white">Appointment Types</CardTitle>
                        <CardDescription className="text-emerald-100/40">Distribution by category</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#000", border: "1px solid #10b981", borderRadius: "8px" }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <CardTitle className="text-white">Weekly Activity</CardTitle>
                    <CardDescription className="text-emerald-100/40">Prescriptions issued per week</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={mockTimeSeriesData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#10b981" opacity={0.1} />
                            <XAxis dataKey="date" stroke="#10b981" opacity={0.6} />
                            <YAxis stroke="#10b981" opacity={0.6} />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#000", border: "1px solid #10b981", borderRadius: "8px" }}
                                labelStyle={{ color: "#10b981" }}
                            />
                            <Bar dataKey="prescriptions" fill="#10b981" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
