"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            setLoading(false);
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Create user profile in Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                uid: userCredential.user.uid,
                email: email,
                createdAt: Date.now(),
                collaborators: [],
                accessibleAccounts: []
            });

            router.push("/"); // Redirect to dashboard/welcome
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError("Este correo ya está registrado.");
            } else {
                setError("Error al registrarse. Intenta nuevamente.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md shadow-lg border-t-4 border-t-secondary">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold text-secondary">Crear Cuenta</CardTitle>
                    <CardDescription>Únete a Fink y controla tus gastos</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <Input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            label="Correo Electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="••••••••"
                            label="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="••••••••"
                            label="Confirmar Contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                        <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90" size="lg" isLoading={loading}>
                            Registrarse
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-gray-500">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-secondary font-semibold hover:underline">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </CardFooter>
            </Card>

            <div className="fixed bottom-4 text-center w-full text-xs text-gray-400">
                OVM Easy Apps. Todos los derechos reservados.
            </div>
        </div>
    );
}
