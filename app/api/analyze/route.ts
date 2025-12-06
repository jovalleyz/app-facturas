import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

export async function POST(req: Request) {
    try {
        if (!apiKey) {
            return NextResponse.json(
                { error: "API Key not configured" },
                { status: 500 }
            );
        }

        const { image } = await req.json();

        if (!image) {
            return NextResponse.json(
                { error: "No image data provided" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
    Analiza esta factura dominicana y extrae los siguientes datos en formato JSON puro (sin markdown):
    - date: Fecha de la factura (DD/MM/YYYY)
    - ncf: Número de Comprobante Fiscal (ej. B01..., E31...)
    - rnc: RNC del negocio
    - businessName: Nombre del establecimiento
    - totalAmount: Monto total a pagar (número)
    - itbis: Monto del ITBIS (18%) (número)
    - legalTip: Monto de propina legal (10%) (número)
    - otherTax: Otros impuestos (número)
    - category: Sugiere una categoría (Comida, Transporte, Supermercado, etc.)

    Si algún campo no está visible, pon null.
    `;

        const imagePart = {
            inlineData: {
                data: image,
                mimeType: "image/jpeg",
            },
        };

        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return NextResponse.json(JSON.parse(cleanedText));
    } catch (error) {
        console.error("Server Analysis Error:", error);
        return NextResponse.json(
            { error: "Failed to process image" },
            { status: 500 }
        );
    }
}
