"use client";

import { useAuth } from "@/components/AuthProvider";
import { LogOut, Megaphone } from "lucide-react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export function Header() {
    const { user } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await auth.signOut();
        router.push("/login");
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    {/* Brand Icon (Megaphone as placeholder/requested or generic Invoice icon) */}
                    {/* Requirement says "Icono PWA relacionado a facturas/IA". 
               Branding says "Reclama.com" in history but this is "App Facturas". 
               I'll use a FileText or similar generic invoice icon, or the requested "Fintech" style.
           */}
                    <div className="bg-primary rounded-lg p-1.5">
                        <span className="text-white font-bold text-xl tracking-tighter">Fi</span>
                    </div>
                    <span className="text-xl font-bold text-primary tracking-tight">Fink</span>
                </div>

                <div className="flex items-center gap-4">
                    {user && (
                        <button
                            onClick={handleLogout}
                            className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                            title="Cerrar Sesión"
                        >
                            <LogOut size={20} />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}
