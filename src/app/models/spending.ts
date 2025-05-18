export interface Spending {
    id: string;
    event: string;
    title: string;
    description?: string;
    category: string;
    amount: number;
    currency: string;
    paidBy?: string;
    paymentMethod: 'Cash' | 'Card' | 'Bank Transfer' | 'Other';
    date: Date;
    notes?: string;
    isReimbursable: boolean;
    createdAt: Date;
    updatedAt: Date;
}
