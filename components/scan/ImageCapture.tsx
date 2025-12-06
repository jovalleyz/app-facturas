"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Camera, Upload, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

interface ImageCaptureProps {
    onImageCaptured: (file: File) => void;
}

export function ImageCapture({ onImageCaptured }: ImageCaptureProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    const processFile = (file: File) => {
        // Simple validation
        if (!file.type.startsWith("image/")) {
            alert("Por favor sube una imagen válida.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        onImageCaptured(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    };

    const clearImage = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    if (preview) {
        return (
            <div className="relative w-full max-w-md mx-auto">
                <img
                    src={preview}
                    alt="Vista previa de factura"
                    className="w-full rounded-xl border-2 border-primary/20 shadow-md"
                />
                <button
                    onClick={clearImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                >
                    <X size={20} />
                </button>
            </div>
        );
    }

    return (
        <Card
            className={`w-full max-w-md mx-auto border-2 border-dashed transition-colors ${dragActive ? "border-primary bg-primary/5" : "border-gray-300 bg-gray-50"
                }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <CardContent className="flex flex-col items-center justify-center py-10 space-y-4">
                <div className="bg-white p-4 rounded-full shadow-sm">
                    <Camera size={32} className="text-primary" />
                </div>

                <div className="text-center space-y-1">
                    <p className="font-medium text-gray-700">Toma una foto o sube una imagen</p>
                    <p className="text-xs text-gray-500">JPG, PNG (Máx 5MB)</p>
                </div>

                <div className="flex gap-3 w-full max-w-xs">
                    <Button
                        variant="primary"
                        className="flex-1"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Camera className="mr-2 h-4 w-4" /> Cámara
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Upload className="mr-2 h-4 w-4" /> Subir
                    </Button>
                </div>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </CardContent>
        </Card>
    );
}
