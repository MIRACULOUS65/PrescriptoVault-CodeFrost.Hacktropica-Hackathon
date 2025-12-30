"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    Home, Settings, User, ChevronLeft, ChevronRight, Menu, X,
    Users, FileText, Calendar, Pill, Activity, Wallet, QrCode, Bell,
    ScanLine, Package, History, Truck, Shield, BarChart, Database, AlertTriangle,
    Stethoscope, Building2, UserCircle, type LucideIcon
} from "lucide-react";

export type UserRole = "doctor" | "patient" | "pharmacy" | "admin";

interface NavItem {
    icon: LucideIcon;
    label: string;
    href: string;
}

interface NavSection {
    title: string;
    items: NavItem[];
}

interface SidebarProps {
    role: UserRole;
    className?: string;
}

const roleConfigs: Record<UserRole, { sections: NavSection[]; icon: LucideIcon; title: string }> = {
    doctor: {
        icon: Stethoscope,
        title: "Doctor Portal",
        sections: [
            {
                title: "Main",
                items: [
                    { icon: Home, label: "Dashboard", href: "/doctor" },
                    { icon: Users, label: "Patients", href: "/doctor/patients" },
                    { icon: FileText, label: "Prescriptions", href: "/doctor/prescriptions" },
                    { icon: Calendar, label: "Appointments", href: "/doctor/appointments" },
                ]
            },
            {
                title: "Resources",
                items: [
                    { icon: Pill, label: "Drug Database", href: "/doctor/drugs" },
                    { icon: Activity, label: "Analytics", href: "/doctor/analytics" },
                ]
            },
            {
                title: "Account",
                items: [
                    { icon: Settings, label: "Settings", href: "/doctor/settings" },
                ]
            }
        ]
    },
    patient: {
        icon: UserCircle,
        title: "Patient Portal",
        sections: [
            {
                title: "Main",
                items: [
                    { icon: Home, label: "Dashboard", href: "/patient" },
                    { icon: Wallet, label: "My Vault", href: "/patient/vault" },
                    { icon: QrCode, label: "QR Codes", href: "/patient/qr-codes" },
                    { icon: Calendar, label: "Appointments", href: "/patient/appointments" },
                ]
            },
            {
                title: "Health",
                items: [
                    { icon: FileText, label: "Health Records", href: "/patient/records" },
                    { icon: Bell, label: "Reminders", href: "/patient/reminders" },
                ]
            },
            {
                title: "Account",
                items: [
                    { icon: Settings, label: "Settings", href: "/patient/settings" },
                ]
            }
        ]
    },
    pharmacy: {
        icon: Building2,
        title: "Pharmacy Portal",
        sections: [
            {
                title: "Main",
                items: [
                    { icon: Home, label: "Dashboard", href: "/pharmacy" },
                    { icon: ScanLine, label: "Verify Prescription", href: "/pharmacy/verify" },
                    { icon: Package, label: "Inventory", href: "/pharmacy/inventory" },
                    { icon: History, label: "Dispensed History", href: "/pharmacy/history" },
                    { icon: Truck, label: "Orders & Shipments", href: "/pharmacy/orders" },
                ]
            },
            {
                title: "Account",
                items: [
                    { icon: Settings, label: "Settings", href: "/pharmacy/settings" },
                ]
            }
        ]
    },
    admin: {
        icon: Shield,
        title: "Admin Portal",
        sections: [
            {
                title: "Main",
                items: [
                    { icon: Home, label: "Dashboard", href: "/admin" },
                    { icon: Users, label: "User Management", href: "/admin/users" },
                    { icon: Shield, label: "Verification", href: "/admin/verification" },
                ]
            },
            {
                title: "System",
                items: [
                    { icon: BarChart, label: "Analytics", href: "/admin/analytics" },
                    { icon: Database, label: "Blockchain", href: "/admin/blockchain" },
                    { icon: AlertTriangle, label: "Security", href: "/admin/security" },
                ]
            },
            {
                title: "Account",
                items: [
                    { icon: Settings, label: "Settings", href: "/admin/settings" },
                ]
            }
        ]
    }
};

interface SidebarContentProps {
    role: UserRole;
    config: { sections: NavSection[]; icon: LucideIcon; title: string };
    RoleIcon: LucideIcon;
    isCollapsed: boolean;
    pathname: string;
    onToggleCollapse?: () => void;
    onClose?: () => void;
}

function SidebarContent({ role, config, RoleIcon, isCollapsed, pathname, onToggleCollapse, onClose }: SidebarContentProps) {
    return (
        <>
            {/* Header */}
            <div className="p-4 border-b border-emerald-500/20">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-950/50 border border-emerald-500/30">
                        <RoleIcon className="h-6 w-6 text-emerald-400" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex-1 min-w-0">
                            <h2 className="text-sm font-semibold text-white truncate">{config.title}</h2>
                            <p className="text-xs text-emerald-100/50 capitalize">{role}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-6">
                {config.sections.map((section, idx) => (
                    <div key={idx}>
                        {!isCollapsed && (
                            <h3 className="text-xs font-semibold text-emerald-100/40 uppercase tracking-wider mb-2 px-3">
                                {section.title}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const ItemIcon = item.icon;
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={onClose}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200",
                                            isActive
                                                ? "bg-emerald-950/50 text-emerald-400 border border-emerald-500/30"
                                                : "text-emerald-100/60 hover:bg-emerald-950/30 hover:text-emerald-300",
                                            isCollapsed && "justify-center"
                                        )}
                                        title={isCollapsed ? item.label : undefined}
                                    >
                                        <ItemIcon className="h-5 w-5 shrink-0" />
                                        {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer - Collapse Toggle (Desktop only) */}
            {onToggleCollapse && (
                <div className="p-4 border-t border-emerald-500/20">
                    <button
                        onClick={onToggleCollapse}
                        className="w-full flex items-center justify-center p-2 rounded-lg text-emerald-100/60 hover:bg-emerald-950/30 hover:text-emerald-300 transition-colors"
                    >
                        {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </button>
                </div>
            )}
        </>
    );
}

export function Sidebar({ role, className }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const pathname = usePathname() || "";
    const config = roleConfigs[role];
    const RoleIcon = config.icon;

    return (
        <>
            {/* Mobile Hamburger */}
            <button
                onClick={() => setIsMobileOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-black/40 backdrop-blur-xl border border-emerald-500/20 text-emerald-400"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isCollapsed ? 80 : 280 }}
                className={cn(
                    "hidden lg:flex flex-col sticky top-0 h-screen bg-black/40 backdrop-blur-xl border-r border-emerald-500/20",
                    className
                )}
            >
                <SidebarContent
                    role={role}
                    config={config}
                    RoleIcon={RoleIcon}
                    isCollapsed={isCollapsed}
                    pathname={pathname}
                    onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
                />
            </motion.aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />

                        {/* Sidebar */}
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-[280px] bg-black/95 backdrop-blur-xl border-r border-emerald-500/20 z-50 flex flex-col"
                        >
                            {/* Close Button */}
                            <div className="p-4 flex justify-end">
                                <button
                                    onClick={() => setIsMobileOpen(false)}
                                    className="p-2 rounded-lg text-emerald-100/60 hover:bg-emerald-950/30 hover:text-emerald-300"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            <SidebarContent
                                role={role}
                                config={config}
                                RoleIcon={RoleIcon}
                                isCollapsed={false}
                                pathname={pathname}
                                onClose={() => setIsMobileOpen(false)}
                            />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
