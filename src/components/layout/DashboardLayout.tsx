"use client";

import React from "react";
import { Sidebar, UserRole } from "./Sidebar";

interface DashboardLayoutProps {
    role: UserRole;
    children: React.ReactNode;
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
    return (
        <div className="flex min-h-screen bg-black">
            <Sidebar role={role} />
            <main className="flex-1 overflow-auto">
                <div className="p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
