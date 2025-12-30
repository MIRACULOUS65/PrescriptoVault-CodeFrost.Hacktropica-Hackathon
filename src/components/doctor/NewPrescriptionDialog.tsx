"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useDoctorStore } from "@/lib/stores/doctorStore";
import { Plus, X } from "lucide-react";

export function NewPrescriptionDialog() {
    const [open, setOpen] = useState(false);
    const [medications, setMedications] = useState([{ drugId: "", dosage: "", frequency: "", duration: "", notes: "" }]);
    const patients = useDoctorStore((state) => state.patients);
    const drugs = useDoctorStore((state) => state.drugs);
    const addPrescription = useDoctorStore((state) => state.addPrescription);

    const addMedication = () => {
        setMedications([...medications, { drugId: "", dosage: "", frequency: "", duration: "", notes: "" }]);
    };

    const removeMedication = (index: number) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    const updateMedication = (index: number, field: string, value: string) => {
        const updated = [...medications];
        updated[index] = { ...updated[index], [field]: value };
        setMedications(updated);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const prescriptionDrugs = medications.map((med, idx) => {
            const drug = drugs.find(d => d.id === med.drugId);
            return {
                drugId: med.drugId,
                drugName: drug?.name || "",
                dosage: formData.get(`dosage-${idx}`) as string,
                frequency: formData.get(`frequency-${idx}`) as string,
                duration: formData.get(`duration-${idx}`) as string,
                quantity: parseInt(formData.get(`quantity-${idx}`) as string) || 30,
                notes: formData.get(`notes-${idx}`) as string || undefined,
            };
        });

        addPrescription({
            doctorId: "doc-001",
            patientId: formData.get("patientId") as string,
            drugs: prescriptionDrugs,
            status: "minted",
        });

        setOpen(false);
        setMedications([{ drugId: "", dosage: "", frequency: "", duration: "", notes: "" }]);
        e.currentTarget.reset();
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-black">
                    <Plus className="h-4 w-4 mr-2" />
                    New Prescription
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-black border-emerald-500/20 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>New Prescription</DialogTitle>
                    <DialogDescription className="text-emerald-100/60">
                        Create a new prescription for a patient
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="patientId">Patient *</Label>
                        <Select name="patientId" required>
                            <SelectTrigger className="bg-emerald-950/20 border-emerald-500/20 text-white">
                                <SelectValue placeholder="Select patient" />
                            </SelectTrigger>
                            <SelectContent className="bg-black border-emerald-500/20">
                                {patients.map((patient) => (
                                    <SelectItem key={patient.id} value={patient.id}>
                                        {patient.name} - {patient.email}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Medications</Label>
                            <Button type="button" size="sm" onClick={addMedication} variant="outline" className="border-emerald-500/30 text-emerald-400">
                                <Plus className="h-4 w-4 mr-1" />
                                Add Medication
                            </Button>
                        </div>

                        {medications.map((med, idx) => (
                            <div key={idx} className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/10 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label>Medication {idx + 1}</Label>
                                    {medications.length > 1 && (
                                        <Button type="button" size="sm" variant="ghost" onClick={() => removeMedication(idx)} className="text-red-400 hover:text-red-300">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-2">
                                        <Label htmlFor={`drug-${idx}`}>Drug *</Label>
                                        <Select value={med.drugId} onValueChange={(value) => updateMedication(idx, "drugId", value)} required>
                                            <SelectTrigger className="bg-emerald-950/20 border-emerald-500/20 text-white">
                                                <SelectValue placeholder="Select drug" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-black border-emerald-500/20">
                                                {drugs.map((drug) => (
                                                    <SelectItem key={drug.id} value={drug.id}>
                                                        {drug.name} ({drug.genericName})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`dosage-${idx}`}>Dosage *</Label>
                                        <Input
                                            id={`dosage-${idx}`}
                                            name={`dosage-${idx}`}
                                            required
                                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                            placeholder="500mg"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`frequency-${idx}`}>Frequency *</Label>
                                        <Input
                                            id={`frequency-${idx}`}
                                            name={`frequency-${idx}`}
                                            required
                                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                            placeholder="Twice daily"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`duration-${idx}`}>Duration *</Label>
                                        <Input
                                            id={`duration-${idx}`}
                                            name={`duration-${idx}`}
                                            required
                                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                            placeholder="30 days"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor={`quantity-${idx}`}>Quantity *</Label>
                                        <Input
                                            id={`quantity-${idx}`}
                                            name={`quantity-${idx}`}
                                            type="number"
                                            required
                                            defaultValue="30"
                                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <Label htmlFor={`notes-${idx}`}>Instructions</Label>
                                        <Textarea
                                            id={`notes-${idx}`}
                                            name={`notes-${idx}`}
                                            className="bg-emerald-950/20 border-emerald-500/20 text-white"
                                            placeholder="Take with food"
                                            rows={2}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="border-emerald-500/30 text-emerald-400">
                            Cancel
                        </Button>
                        <Button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-black">
                            Create Prescription
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
