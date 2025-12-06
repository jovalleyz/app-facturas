"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, FileText, PieChart, User } from "lucide-react";
import { clsx } from "clsx";

export function BottomNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-white border-t border-gray-200 pb-safe">
            <div className="grid h-full grid-cols-5 items-center justify-items-center">
                <Link href="/" className={clsx("flex flex-col items-center gap-1 p-2", isActive("/") ? "text-primary" : "text-gray-400")}>
                    <Home size={24} />
                    <span className="text-[10px] font-medium">Inicio</span>
                </Link>

                <Link href="/invoices" className={clsx("flex flex-col items-center gap-1 p-2", isActive("/invoices") ? "text-primary" : "text-gray-400")}>
                    <FileText size={24} />
                    <span className="text-[10px] font-medium">Facturas</span>
                </Link>

                <Link href="/scan" className="relative -top-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-lg ring-4 ring-white">
                        <Camera size={28} className="text-white" />
                    </div>
                </Link>

                <Link href="/stats" className={clsx("flex flex-col items-center gap-1 p-2", isActive("/stats") ? "text-primary" : "text-gray-400")}>
                    <PieChart size={24} />
                    <span className="text-[10px] font-medium">Reportes</span>
                </Link>

                <Link href="/profile" className={clsx("flex flex-col items-center gap-1 p-2", isActive("/profile") ? "text-primary" : "text-gray-400")}>
                    <User size={24} />
                    <span className="text-[10px] font-medium">Perfil</span>
                </Link>
            </div>
        </nav>
    );
}
