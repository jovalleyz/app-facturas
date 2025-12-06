import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(apiKey);

export async function processInvoiceImage(imageBase64: string): Promise<any> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analiza esta factura dominicana y extrae los siguientes datos en formato JSON puro (sin markdown):
    - date: Fecha de la factura (DD/MM/YYYY)
    - time: Hora (opcional)
    - ncf: Número de Comprobante Fiscal (ej. B01..., E31...)
    - rnc: RNC del negocio
    - businessName: Nombre del establecimiento
    - totalAmount: Monto total a pagar (número)
    - itbis: Monto del ITBIS (18%) (número)
    - legalTip: Monto de propina legal (10%) (número)
    - otherTax: Otros impuestos (16% selectivo, etc) (número)
    - category: Sugiere una categoría (Comida, Transporte, Supermercado, etc.)

    Si algún campo no está visible o no existe, pon null.
  `;

    const imagePart = {
        inlineData: {
            data: imageBase64,
            mimeType: "image/jpeg", // Assume jpeg for now, can be dynamic
        },
    };

    try {
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        const text = response.text();

        // Clean code blocks if present
        const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(cleanedText);
    } catch (error) {
        console.error("Error analyzing invoice:", error);
        throw new Error("Failed to analyze invoice image");
    }
}
