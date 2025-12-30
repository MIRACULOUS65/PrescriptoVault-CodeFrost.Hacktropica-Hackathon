"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

export function ScheduleAppointmentDialog() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // For now, just show an alert with the data
        alert(`Appointment Scheduled!\n\nPatient: ${formData.get("patientName")}\nDate: ${formData.get("date")}\nTime: ${formData.get("time")}\nType: ${formData.get("type")}\nReason: ${formData.get("reason")}`);

        setOpen(false);
        e.currentTarget.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Appointment
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-emerald-500/20 text-white max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Schedule New Appointment</DialogTitle>
                    <DialogDescription className="text-emerald-100/60">
                        Create a new appointment for a patient
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="patientName">Patient Name *</Label>
                        <Input
                            id="patientName"
                            name="patientName"
                            required
                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date *</Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                required
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="time">Time *</Label>
                            <Input
                                id="time"
                                name="time"
                                type="time"
                                required
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Appointment Type *</Label>
                            <Select name="type" required>
                                <SelectTrigger className="bg-emerald-950/20 border-emerald-500/20 text-white">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent className="bg-black border-emerald-500/20">
                                    <SelectItem value="consultation">Consultation</SelectItem>
                                    <SelectItem value="follow-up">Follow-up</SelectItem>
                                    <SelectItem value="checkup">Checkup</SelectItem>
                                    <SelectItem value="emergency">Emergency</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration (minutes) *</Label>
                            <Input
                                id="duration"
                                name="duration"
                                type="number"
                                required
                                defaultValue="30"
                                className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="reason">Reason for Visit *</Label>
                        <Textarea
                            id="reason"
                            name="reason"
                            required
                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                            placeholder="Describe the reason for this appointment..."
                            rows={3}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-emerald-500/30 text-emerald-400">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black">
                            Schedule Appointment
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
