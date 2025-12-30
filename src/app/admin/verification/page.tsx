"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, FileText, UserCheck } from "lucide-react";

export default function VerificationPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                    <UserCheck className="h-8 w-8" />
                    Verification Requests
                </h1>
                <p className="text-emerald-100/60 mt-1">Review pending registrations from doctors and pharmacies</p>
            </div>

            <div className="space-y-4">
                {[
                    { name: "Dr. Anjali Gupta", type: "Doctor", license: "DOC-2024-8892", date: "Today", status: "Pending" },
                    { name: "City Care Pharmacy", type: "Pharmacy", license: "PH-MUM-4451", date: "Yesterday", status: "Pending" },
                ].map((req, idx) => (
                    <Card key={idx} className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardContent className="p-6 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 font-bold">
                                    {req.name[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">{req.name}</h3>
                                    <div className="flex items-center gap-2 text-sm text-emerald-100/60">
                                        <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400">{req.type}</Badge>
                                        <span>License: {req.license}</span>
                                        <span>•</span>
                                        <span>Raised: {req.date}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button variant="outline" className="border-emerald-500/20 text-emerald-100/60 hover:text-white">
                                    <FileText className="h-4 w-4 mr-2" />
                                    View Documents
                                </Button>
                                <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-950/30 hover:text-red-300">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Reject
                                </Button>
                                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                    Approve
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <div className="text-center py-8 text-emerald-100/40">
                    <p>No more pending requests</p>
                </div>
            </div>
        </div>
    );
}
