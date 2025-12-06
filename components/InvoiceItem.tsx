import { Invoice } from "@/types";
import { Link } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface InvoiceItemProps {
    invoice: Invoice;
}

export function InvoiceItem({ invoice }: InvoiceItemProps) {
    return (
        <a href={`/invoices/${invoice.id}`} className="block">
            <Card className="hover:shadow-md transition-shadow mb-3 border-l-4 border-l-primary/50 overflow-hidden">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-gray-800 line-clamp-1">{invoice.businessName || "Negocio Desconocido"}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                                {format(invoice.createdAt, "d MMM yyyy", { locale: es })}
                            </span>
                            {invoice.category && (
                                <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                                    {invoice.category}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="text-right">
                        <p className="font-bold text-primary text-lg">
                            RD$ {invoice.totalAmount.toLocaleString('es-DO', { minimumFractionDigits: 2 })}
                        </p>
                        <p className="text-xs text-gray-400 capitalize">{invoice.status === 'pending' ? 'Pendiente' : invoice.status}</p>
                    </div>
                </CardContent>
            </Card>
        </a>
    );
}
