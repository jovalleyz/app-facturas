import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Invoice } from "@/types";

/**
 * Uploads the image to Firebase Storage and returns the URL.
 */
export async function uploadInvoiceImage(file: File, userId: string): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt}`;
    const storageRef = ref(storage, `invoices/${fileName}`);

    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
}

/**
 * Saves the invoice data to Firestore.
 */
export async function saveInvoice(userId: string, data: Partial<Invoice>, imageUrl: string): Promise<string> {
    const invoiceData = {
        ...data,
        userId,
        imageUrl,
        status: 'pending',
        createdAt: Date.now(), // Use timestamp for easier client-side sorting initially
        updatedAt: Date.now()
    };

    // Add to 'invoices' collection
    const docRef = await addDoc(collection(db, "invoices"), invoiceData);
    return docRef.id;
}
