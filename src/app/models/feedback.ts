export interface Feedback {
    id: string,
    event: string;
    email: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
}