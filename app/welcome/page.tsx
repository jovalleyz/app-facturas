"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Footer } from "@/components/layout/Footer";

export default function WelcomePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8">

                <div className="bg-primary/10 p-6 rounded-full animate-bounce-slow">
                    <CheckCircle className="h-16 w-16 text-primary" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">¡Bienvenido a Fink!</h1>
                    <p className="text-gray-500 max-w-xs mx-auto">
                        Tu asistente inteligente para organizar facturas y controlar gastos automáticamente.
                    </p>
                </div>

                <div className="w-full max-w-sm space-y-3">
                    <Link href="/">
                        <Button className="w-full h-14 text-base shadow-lg shadow-primary/25" size="lg">
                            Comenzar Ahora <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>

                    <p className="text-xs text-gray-400 mt-4">
                        Al continuar, aceptas nuestros términos y condiciones.
                    </p>
                </div>

            </main>

            <div className="pb-4">
                <Footer />
            </div>
        </div>
    );
}
