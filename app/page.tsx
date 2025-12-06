"use client";

import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import { TrendingUp, DollarSign, FileText } from "lucide-react";
import Link from "next/link";
import { useInvoices } from "@/lib/hooks";
import { InvoiceItem } from "@/components/InvoiceItem";

export default function HomePage() {
  const { user, loading: authLoading } = useAuth();
  const { invoices, loading: dataLoading } = useInvoices(user?.uid || null);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const stats = useMemo(() => {
    const total = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
    const count = invoices.length;
    return { total, count };
  }, [invoices]);

  const recentInvoices = invoices.slice(0, 3);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container px-4 py-6 space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">Hola, {user.displayName || "Usuario"} 👋</h1>
          <p className="text-gray-500">Aquí está el resumen de tus gastos.</p>
        </div>

        {/* Stats Cards Carousel/Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary text-white border-none shadow-lg shadow-primary/20">
            <CardContent className="p-4 flex flex-col justify-between h-32">
              <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center">
                <DollarSign size={18} />
              </div>
              <div>
                <p className="text-primary-foreground/80 text-xs font-medium">Gastos del Mes</p>
                <h3 className="text-xl font-bold break-all">
                  RD$ {stats.total.toLocaleString('es-DO', { maximumFractionDigits: 0 })}
                </h3>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-4 flex flex-col justify-between h-32">
              <div className="bg-secondary/10 w-8 h-8 rounded-full flex items-center justify-center text-secondary">
                <TrendingUp size={18} />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium">Facturas</p>
                <h3 className="text-2xl font-bold text-gray-800">{stats.count}</h3>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Recientes</h2>
            <Link href="/invoices" className="text-sm text-primary font-medium hover:underline">Ver todo</Link>
          </div>

          {recentInvoices.length > 0 ? (
            <div className="space-y-3">
              {recentInvoices.map(inv => (
                <InvoiceItem key={inv.id} invoice={inv} />
              ))}
            </div>
          ) : (
            <Card className="border-dashed border-2 border-gray-200 bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center justify-center py-8 text-center bg-white/50">
                <div className="bg-gray-100 p-3 rounded-full mb-3">
                  <FileText className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-500 font-medium">No hay facturas recientes</p>
                <p className="text-gray-400 text-xs mt-1">Empieza escaneando tu primera factura</p>
              </CardContent>
            </Card>
          )}
        </div>

      </main>

      <div className="container px-4">
        <Footer />
      </div>

      <BottomNav />
    </div>
  );
}
