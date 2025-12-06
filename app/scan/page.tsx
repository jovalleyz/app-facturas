"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { ImageCapture } from "@/components/scan/ImageCapture";
import { InvoiceForm } from "@/components/scan/InvoiceForm";
import { processInvoiceImage } from "@/lib/gemini";
import { saveInvoice, uploadInvoiceImage } from "@/lib/invoices";
import { Header } from "@/components/layout/Header";
import { Invoice } from "@/types";

export default function ScanPage() {
    const { user } = useAuth();
    const router = useRouter();

    const [step, setStep] = useState<'capture' | 'analyzing' | 'validate'>('capture');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [extractedData, setExtractedData] = useState<Partial<Invoice>>({});
    const [isSaving, setIsSaving] = useState(false);

    // Convert File to Base64 for Gemini
    const fileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const result = reader.result as string;
                // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
        });
    };

    const handleImageCaptured = async (file: File) => {
        setImageFile(file);
        setStep('analyzing');

        try {
            const base64 = await fileToBase64(file);
            const data = await processInvoiceImage(base64);
            setExtractedData(data);
            setStep('validate');
        } catch (error) {
            console.error("Error analyzing image:", error);
            alert("Error al analizar la imagen. Intenta nuevamente.");
            setStep('capture');
        }
    };

    const handleSave = async (finalData: Partial<Invoice>) => {
        if (!user || !imageFile) return;
        setIsSaving(true);

        try {
            // 1. Upload Image
            const imageUrl = await uploadInvoiceImage(imageFile, user.uid);

            // 2. Save Data
            await saveInvoice(user.uid, finalData, imageUrl);

            // 3. Redirect
            router.push("/invoices"); // Or dashboard
        } catch (error) {
            console.error("Error saving invoice:", error);
            alert("Error al guardar la factura.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="container px-4 py-6 pb-24">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    {step === 'capture' && "Capturar Factura"}
                    {step === 'analyzing' && "Analizando..."}
                    {step === 'validate' && "Validar Datos"}
                </h1>

                {step === 'capture' && (
                    <ImageCapture onImageCaptured={handleImageCaptured} />
                )}

                {step === 'analyzing' && (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                        <p className="text-gray-500 animate-pulse">Nuestra IA está leyendo tu factura...</p>
                    </div>
                )}

                {step === 'validate' && (
                    <InvoiceForm
                        initialData={extractedData}
                        onSave={handleSave}
                        onCancel={() => setStep('capture')}
                        isSaving={isSaving}
                    />
                )}
            </main>
        </div>
    );
}
