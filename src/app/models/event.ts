interface EventLocation {
    name: string;
    address: string;
    cost: number;
}

interface Budget {
    venue: number;
    catering: number;
    equipment: number;
    staff: number;
    miscellaneous: number;
}

export interface Event {
    id: string;
    title: string;
    type: string;
    description: string;
    from: Date;
    until: Date;
    guestCount: number;
    createdBy: string;
    location: EventLocation;
    budget: Budget;
    currency: string;
    schedule: string[];
    requiredStaff: string[];
    notes: string[];
    createdAt: Date;
    updatedAt: Date;
}
