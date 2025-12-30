"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDoctorStore } from "@/lib/stores/doctorStore";
import { Plus } from "lucide-react";

export function AddPatientDialog() {
    const [open, setOpen] = useState(false);
    const addPatient = useDoctorStore((state) => state.addPatient);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        addPatient({
            type: "patient",
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            walletAddress: formData.get("walletAddress") as string || undefined,
            verified: true,
            dateOfBirth: new Date(formData.get("dateOfBirth") as string),
            bloodType: formData.get("bloodType") as string || undefined,
            allergies: (formData.get("allergies") as string).split(",").map(a => a.trim()).filter(Boolean),
            healthScore: 75,
            streak: 0,
            grantedAccessTo: [],
        });

        setOpen(false);
        e.currentTarget.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Patient
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-emerald-500/20 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription className="text-emerald-100/60">
                        Create a new patient record
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email *</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                                required
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bloodType">Blood Type</Label>
                            <Select name="bloodType">
                                <SelectTrigger className="bg-emerald-950/20 border-emerald-500/20 text-white">
                                    <SelectValue placeholder="Select blood type" />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-emerald-500/20">
                                    <SelectItem value="A+">A+</SelectItem>
                                    <SelectItem value="A-">A-</SelectItem>
                                    <SelectItem value="B+">B+</SelectItem>
                                    <SelectItem value="B-">B-</SelectItem>
                                    <SelectItem value="O+">O+</SelectItem>
                                    <SelectItem value="O-">O-</SelectItem>
                                    <SelectItem value="AB+">AB+</SelectItem>
                                    <SelectItem value="AB-">AB-</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="walletAddress">Wallet Address (Optional)</Label>
                        <Input
                            id="walletAddress"
                            name="walletAddress"
                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            placeholder="ALGO..."
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="allergies">Allergies (comma-separated)</Label>
                        <Textarea
                            id="allergies"
                            name="allergies"
                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            placeholder="Penicillin, Peanuts, etc."
                            rows={2}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-emerald-500/30 text-emerald-400">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black">
                            Add Patient
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
