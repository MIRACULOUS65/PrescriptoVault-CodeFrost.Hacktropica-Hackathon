"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Users,
    Search,
    MoreVertical,
    Filter,
    Download,
    Shield,
    Stethoscope,
    User
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const users = [
    { id: "USR-001", name: "Dr. Priya Sharma", email: "priya.sharma@medcare.com", role: "Doctor", status: "Active", joined: "12/10/2024" },
    { id: "USR-002", name: "Amit Patel", email: "amit.patel@gmail.com", role: "Patient", status: "Active", joined: "12/12/2024" },
    { id: "USR-003", name: "Apollo Admin", email: "admin@apollo.com", role: "Pharmacy", status: "Active", joined: "12/05/2024" },
    { id: "USR-004", name: "System Admin", email: "root@prescripto.com", role: "Admin", status: "Active", joined: "11/01/2024" },
    { id: "USR-005", name: "Dr. Rajesh Kumar", email: "r.kumar@heartcare.org", role: "Doctor", status: "Pending", joined: "12/28/2024" },
    { id: "USR-006", name: "Sarah Jones", email: "sarah.j@gmail.com", role: "Patient", status: "Inactive", joined: "12/15/2024" },
];

export default function UserManagementPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getRoleIcon = (role: string) => {
        switch (role) {
            case 'Doctor': return Stethoscope;
            case 'Admin': return Shield;
            default: return User;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
            case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Inactive': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <Users className="h-8 w-8" />
                    User Management
                </h1>
                <p className="text-emerald-100/60 mt-1">Manage system access and user roles</p>
            </div>

            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-white">All Users</CardTitle>
                        <CardDescription className="text-emerald-100/40">Total {users.length} registered users</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" className="border-emerald-500/20 text-emerald-400">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button>
                        <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                            <Users className="h-4 w-4 mr-2" />
                            Add User
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-500/50" />
                            <Input
                                placeholder="Search users..."
                                className="pl-10 bg-black/40 border-emerald-500/20 text-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" size="icon" className="border-emerald-500/20 text-emerald-400">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {filteredUsers.map((user) => {
                            const RoleIcon = getRoleIcon(user.role);
                            return (
                                <div key={user.id} className="flex items-center justify-between p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/10 hover:border-emerald-500/30 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                            <RoleIcon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{user.name}</h4>
                                            <p className="text-sm text-emerald-100/60">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="text-right hidden md:block">
                                            <p className="text-sm font-medium text-white">{user.role}</p>
                                            <p className="text-xs text-emerald-100/40">Joined {user.joined}</p>
                                        </div>
                                        <Badge className={getStatusColor(user.status)}>
                                            {user.status}
                                        </Badge>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-emerald-100/40 hover:text-white">
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-black border-emerald-500/20">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem className="text-emerald-400 focus:text-emerald-300 focus:bg-emerald-950/30">Edit Details</DropdownMenuItem>
                                                <DropdownMenuItem className="text-emerald-400 focus:text-emerald-300 focus:bg-emerald-950/30">View Activity</DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-emerald-500/20" />
                                                <DropdownMenuItem className="text-red-400 focus:text-red-300 focus:bg-red-950/30">Suspend User</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
