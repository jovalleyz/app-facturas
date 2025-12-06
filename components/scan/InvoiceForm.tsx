"use client";

import { Invoice } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useState } from "react";
import { Save, AlertCircle } from "lucide-react";

interface InvoiceFormProps {
    initialData: Partial<Invoice>;
    onSave: (data: Partial<Invoice>) => void;
    onCancel: () => void;
    isSaving?: boolean;
}

export function InvoiceForm({ initialData, onSave, onCancel, isSaving }: InvoiceFormProps) {
    const [formData, setFormData] = useState<Partial<Invoice>>(initialData);

    const handleChange = (field: keyof Invoice, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 text-sm text-blue-800">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <p>Revisa los datos extraídos por la IA. Corrige cualquier error antes de guardar.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="NCF"
                    value={formData.ncf || ""}
                    onChange={(e) => handleChange("ncf", e.target.value)}
                    placeholder="B01..."
                    required
                />
                <Input
                    label="RNC"
                    value={formData.rnc || ""}
                    onChange={(e) => handleChange("rnc", e.target.value)}
                    placeholder="101..."
                />
            </div>

            <Input
                label="Negocio"
                value={formData.businessName || ""}
                onChange={(e) => handleChange("businessName", e.target.value)}
                placeholder="Nombre del establecimiento"
            />

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Fecha"
                    type="text"
                    value={formData.date || ""}
                    onChange={(e) => handleChange("date", e.target.value)}
                    placeholder="DD/MM/YYYY"
                />
                <Input
                    label="Categoría"
                    value={formData.category || ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="Ej: Comida"
                />
            </div>

            <div className="space-y-2 border-t pt-4 border-gray-100">
                <p className="font-semibold text-gray-700 mb-2">Montos (RD$)</p>

                <div className="grid grid-cols-3 gap-2">
                    <Input
                        label="ITBIS (18%)"
                        type="number"
                        step="0.01"
                        value={formData.itbis || 0}
                        onChange={(e) => handleChange("itbis", parseFloat(e.target.value) || 0)}
                    />
                    <Input
                        label="Propina (10%)"
                        type="number"
                        step="0.01"
                        value={formData.legalTip || 0}
                        onChange={(e) => handleChange("legalTip", parseFloat(e.target.value) || 0)}
                    />
                    <Input
                        label="Otros Imp."
                        type="number"
                        step="0.01"
                        value={formData.otherTax || 0}
                        onChange={(e) => handleChange("otherTax", parseFloat(e.target.value) || 0)}
                    />
                </div>

                <Input
                    label="Monto Total"
                    type="number"
                    step="0.01"
                    className="text-lg font-bold text-primary"
                    value={formData.totalAmount || 0}
                    onChange={(e) => handleChange("totalAmount", parseFloat(e.target.value) || 0)}
                    required
                />
            </div>

            <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" className="flex-1" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" variant="primary" className="flex-1" isLoading={isSaving}>
                    <Save className="mr-2 h-4 w-4" /> Guardar Factura
                </Button>
            </div>
        </form>
    );
}
