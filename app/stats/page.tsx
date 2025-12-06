"use client";

import { useAuth } from "@/components/AuthProvider";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { useInvoices } from "@/lib/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const COLORS = ['#4E73DF', '#1CC88A', '#36B9CC', '#F6C23E', '#E74A3B', '#858796'];

export default function StatsPage() {
    const { user } = useAuth();
    const { invoices, loading } = useInvoices(user?.uid || null);

    const categoryData = useMemo(() => {
        const categories: Record<string, number> = {};
        invoices.forEach(inv => {
            const cat = inv.category || 'Otros';
            categories[cat] = (categories[cat] || 0) + (inv.totalAmount || 0);
        });
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [invoices]);

    const taxData = useMemo(() => {
        let totalItbis = 0;
        let totalTip = 0;
        let totalOther = 0;
        let totalBase = 0;

        invoices.forEach(inv => {
            totalItbis += inv.itbis || 0;
            totalTip += inv.legalTip || 0;
            totalOther += inv.otherTax || 0;
            totalBase += ((inv.totalAmount || 0) - (inv.itbis || 0) - (inv.legalTip || 0) - (inv.otherTax || 0));
        });

        return [
            { name: 'Base', value: totalBase },
            { name: 'ITBIS', value: totalItbis },
            { name: 'Propina', value: totalTip },
            { name: 'Otros Imp.', value: totalOther },
        ].filter(d => d.value > 0);
    }, [invoices]);

    if (loading) {
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
                <h1 className="text-2xl font-bold text-gray-800">Estadísticas</h1>

                {/* Category Pie Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Gastos por Categoría</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                        {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={categoryData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value: number) => `RD$ ${value.toLocaleString()}`} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                No hay datos suficientes
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Tax Breakdown Bar Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Desglose de Impuestos</CardTitle>
                    </CardHeader>
                    <CardContent className="h-64">
                        {taxData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={taxData}>
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip cursor={{ fill: 'transparent' }} formatter={(value: number) => `RD$ ${value.toLocaleString()}`} />
                                    <Bar dataKey="value" fill="#4E73DF" radius={[4, 4, 0, 0]} barSize={40} >
                                        {taxData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={index === 0 ? '#4E73DF' : '#1CC88A'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
                                No hay datos suficientes
                            </div>
                        )}
                    </CardContent>
                </Card>

            </main>

            <BottomNav />
        </div>
    );
}
