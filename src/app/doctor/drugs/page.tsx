"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockDrugs } from "@/lib/mockData/doctor";
import { Search, Pill, AlertTriangle, Info } from "lucide-react";

export default function DrugDatabasePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredDrugs = mockDrugs.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.genericName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Drug Database</h1>
                <p className="text-emerald-100/60 mt-1">Search and explore medication information</p>
            </div>

            <Card className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                <CardHeader>
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-emerald-400" />
                        <Input
                            placeholder="Search by drug name, generic name, or category..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 bg-emerald-950/20 border-emerald-500/20 text-white placeholder:text-emerald-100/40"
                        />
                    </div>
                </CardHeader>
            </Card>

            <div className="space-y-4">
                {filteredDrugs.map((drug) => (
                    <Card key={drug.id} className="bg-black/40 backdrop-blur-xl border-emerald-500/20">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-emerald-500/20">
                                        <Pill className="h-5 w-5 text-emerald-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white">{drug.name}</CardTitle>
                                        <p className="text-sm text-emerald-100/60">{drug.genericName}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                                        {drug.category}
                                    </Badge>
                                    {drug.inStock && (
                                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                            In Stock
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-emerald-100/60">{drug.description}</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-100/80 mb-2 flex items-center gap-2">
                                        <Info className="h-4 w-4" />
                                        Dosage Forms
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {drug.dosageForms.map((form, idx) => (
                                            <Badge key={idx} variant="outline" className="border-emerald-500/30 text-emerald-400">
                                                {form}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-emerald-100/80 mb-2">Common Dosages</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {drug.commonDosages.map((dosage, idx) => (
                                            <Badge key={idx} variant="outline" className="border-emerald-500/30 text-emerald-400">
                                                {dosage}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-semibold text-emerald-100/80 mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                                    Side Effects
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {drug.sideEffects.map((effect, idx) => (
                                        <Badge key={idx} variant="outline" className="border-amber-500/30 text-amber-400">
                                            {effect}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <h4 className="text-emerald-100/80 font-semibold mb-1">Manufacturer</h4>
                                    <p className="text-emerald-100/60">{drug.manufacturer}</p>
                                </div>
                                <div>
                                    <h4 className="text-emerald-100/80 font-semibold mb-1">Price</h4>
                                    <p className="text-emerald-100/60">₹{drug.price}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
