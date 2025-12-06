"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Invoice } from "@/types";
import { Header } from "@/components/layout/Header";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";

export default function InvoiceDetailPage() {
    const { user, loading: authLoading } = useAuth();
    const { id } = useParams();
    const router = useRouter();
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/login");
            return;
        }

        const fetchInvoice = async () => {
            if (!id || typeof id !== 'string') return;
            try {
                const docRef = doc(db, "invoices", id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setInvoice({ id: docSnap.id, ...docSnap.data() } as Invoice);
                } else {
                    alert("Factura no encontrada");
                    router.push("/invoices");
                }
            } catch (error) {
                console.error("Error fetching invoice:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [user, authLoading, id, router]);

    if (loading || !invoice) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pb-10">
            <Header />

            <main className="container px-4 py-6 space-y-6">
                <Button variant="ghost" className="pl-0 gap-2 text-gray-500 hover:text-primary" onClick={() => router.back()}>
                    <ArrowLeft size={20} /> Volver
                </Button>

                <div className="flex justify-between items-start">
                    <h1 className="text-2xl font-bold text-gray-800 break-words max-w-[70%]">
                        {invoice.businessName || "Negocio Desconocido"}
                    </h1>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-full">
                            <Share2 size={18} />
                        </Button>
                    </div>
                </div>

                <Card className="overflow-hidden border-t-4 border-t-primary shadow-lg">
                    <CardContent className="p-0">
                        <div className="bg-gray-50 p-6 border-b border-gray-100 grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Fecha</p>
                                <p className="font-medium text-gray-800">
                                    {format(invoice.createdAt, "d MMMM yyyy", { locale: es })}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-semibold">Total</p>
                                <p className="font-bold text-xl text-primary">
                                    RD$ {invoice.totalAmount?.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
                                </p>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-y-4 text-sm">
                                <div>
                                    <p className="text-gray-500">NCF</p>
                                    <p className="font-medium">{invoice.ncf || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">RNC</p>
                                    <p className="font-medium">{invoice.rnc || "N/A"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Categoría</p>
                                    <p className="font-medium">{invoice.category || "General"}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500">Estado</p>
                                    <p className="font-medium capitalize">{invoice.status}</p>
                                </div>
                            </div>

                            <div className="border-t border-dashed border-gray-200 my-4 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal / Otros</span>
                                    <span className="font-medium">RD$ {((invoice.totalAmount || 0) - (invoice.itbis || 0) - (invoice.legalTip || 0)).toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">ITBIS (18%)</span>
                                    <span className="font-medium">RD$ {invoice.itbis?.toLocaleString('es-DO', { minimumFractionDigits: 2 }) || "0.00"}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Propina Legal (10%)</span>
                                    <span className="font-medium">RD$ {invoice.legalTip?.toLocaleString('es-DO', { minimumFractionDigits: 2 }) || "0.00"}</span>
                                </div>
                                <div className="flex justify-between text-base font-bold text-gray-800 pt-2 border-t border-gray-100">
                                    <span>Total Pagado</span>
                                    <span>RD$ {invoice.totalAmount?.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
                                </div>
                            </div>
                        </div>

                        {invoice.imageUrl && (
                            <div className="bg-gray-100 p-6 border-t border-gray-200">
                                <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Comprobante</p>
                                <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm relative group">
                                    <img src={invoice.imageUrl} alt="Comprobante" className="w-full object-cover max-h-96" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <a href={invoice.imageUrl} target="_blank" rel="noreferrer">
                                            <Button variant="secondary" size="sm">Ver Original</Button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}

                    </CardContent>
                </Card>

            </main>
        </div>
    );
}
