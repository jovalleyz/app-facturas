"use client";

import { useAuth } from "@/components/AuthProvider";
import { useInvoices } from "@/lib/hooks";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { InvoiceItem } from "@/components/InvoiceItem";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useState } from "react";

export default function InvoicesPage() {
    const { user } = useAuth();
    const { invoices, loading } = useInvoices(user?.uid || null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredInvoices = invoices.filter(inv =>
        inv.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.ncf?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />

            <main className="container px-4 py-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Mis Facturas</h1>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                        className="pl-10 rounded-full bg-white shadow-sm border-none"
                        placeholder="Buscar por negocio, NCF..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* List */}
                <div className="space-y-1">
                    {loading ? (
                        <div className="text-center py-10">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
                        </div>
                    ) : filteredInvoices.length > 0 ? (
                        filteredInvoices.map(inv => (
                            <InvoiceItem key={inv.id} invoice={inv} />
                        ))
                    ) : (
                        <div className="text-center py-10 text-gray-400">
                            <p>No se encontraron facturas.</p>
                        </div>
                    )}
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
