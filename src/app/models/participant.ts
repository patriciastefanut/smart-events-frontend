export interface Participant {
    id: string,
    event: string;
    invitation: string;
    email: string;
    firstname: string;
    lastname: string;
    notes: string | null;
    dietaryRestrictions: string | null;
    checkedIn: boolean;
    createdAt: Date;
    updatedAt: Date;
}
