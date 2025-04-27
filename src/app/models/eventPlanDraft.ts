interface Location {
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

interface ScheduleItem {
    time: Date;
    activity: string;
}

interface Suggestion {
    title: string;
    type: string;
    description: string;
    from: Date;
    until: Date;
    guestCount: number;
    locations: Location[];
    budget: Budget;
    currency: string;
    schedule: ScheduleItem[];
    requiredStaff: string[];
    notes: string[];
}

interface EventInput {
    eventType: string;
    from: Date;
    until: Date;
    location: string;
    guestCount: number;
    budget: Budget;
    currency: string;
    preferences: string[];
    vibe: string;
    specialRequests: string[];
}

interface EventPlanDraft {
    id: string;
    createdBy: string;
    input: EventInput;
    suggestion: Suggestion;
}
