export interface Invoice {
    id: string;
    userId: string;
    imageUrl: string;

    // Extracted Data
    date: string; // DD/MM/YYYY
    time?: string;
    ncf: string;
    rnc: string;
    businessName: string;

    // Financials
    totalAmount: number;
    itbis: number; // 18%
    legalTip: number; // 10%
    otherTax: number; // 16% or others

    category?: string;

    // Metadata
    createdAt: number; // Date.now()
    updatedAt: number;
    status: 'pending' | 'verified' | 'rejected';
}

export interface UserProfile {
    uid: string;
    email: string;
    displayName?: string;
    collaborators: string[]; // List of emails allowed to view this user's data
    accessibleAccounts: string[]; // List of UIDs of accounts this user can view
    createdAt: number;
}

export interface ProcessingResult {
    success: boolean;
    data?: Partial<Invoice>;
    error?: string;
}
