"use client";

import { useAuth } from "@/components/AuthProvider";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { UserPlus, Users, Trash2 } from "lucide-react";
import { arrayUnion, doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfilePage() {
    const { user } = useAuth();
    const [inviteEmail, setInviteEmail] = useState("");
    const [collaborators, setCollaborators] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setCollaborators(docSnap.data().collaborators || []);
            }
        };
        fetchProfile();
    }, [user]);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !inviteEmail) return;
        setLoading(true);

        try {
            // In a real app, you'd verify the email exists first.
            // Here we just add it to the list.
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                collaborators: arrayUnion(inviteEmail)
            });
            setCollaborators(prev => [...prev, inviteEmail]);
            setInviteEmail("");
            alert(`Invitación enviada a ${inviteEmail}`);
        } catch (error) {
            console.error("Error inviting:", error);
            alert("Error al invitar.");
        } finally {
            setLoading(false);
        }
    };

    const removeCollaborator = async (email: string) => {
        if (!user) return;
        if (!confirm(`¿Eliminar acceso a ${email}?`)) return;

        try {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                collaborators: arrayRemove(email)
            });
            setCollaborators(prev => prev.filter(c => c !== email));
        } catch (error) {
            console.error("Error removing:", error);
        }
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            <Header />

            <main className="container px-4 py-6 space-y-6">
                <h1 className="text-2xl font-bold text-gray-800">Mi Perfil</h1>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Información</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium">{user?.email}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Users className="text-primary" />
                            <CardTitle className="text-lg">Colaboradores</CardTitle>
                        </div>
                        <CardDescription>
                            Invita a personas para que puedan ver tus facturas (solo lectura).
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleInvite} className="flex gap-2">
                            <Input
                                placeholder="correo@ejemplo.com"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                type="email"
                                required
                            />
                            <Button type="submit" disabled={loading}>
                                <UserPlus size={18} />
                            </Button>
                        </form>

                        <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Accesos activos:</p>
                            {collaborators.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">No tienes colaboradores.</p>
                            ) : (
                                collaborators.map(email => (
                                    <div key={email} className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
                                        <span className="text-sm">{email}</span>
                                        <button onClick={() => removeCollaborator(email)} className="text-red-400 hover:text-red-600">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>

            <BottomNav />
        </div>
    );
}
