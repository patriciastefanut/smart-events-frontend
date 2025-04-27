export interface FeedbackDTO {
    id: string,
    event: string;
    email: string;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
}