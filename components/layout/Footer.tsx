import Link from "next/link";

export function Footer() {
    const whatsappUrl = "https://wa.me/18295341802?text=Estoy%20usando%20la%20aplicación%20FacturIA,%20me%20encanta%20y%20me%20gustaría%20que%20me%20ayudes%20con%20un%20proyecto%20que%20tengo";

    return (
        <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-100 mt-8">
            <p className="mb-1">OVM Easy Apps. Todos los derechos reservados.</p>
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
            >
                Contáctanos
            </a>
        </footer>
    );
}
