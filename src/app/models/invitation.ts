export interface Invitation {
    id: string,
    event: string,
    email: string,
    firstname: string,
    lastname: string,
    status: 'pending' | 'accepted' | 'declined' | 'cancelled',
    sentAt: Date,
    respondedAt: Date,
    respondBefore: Date,
    createdAt: Date,
    updatedAt: Date,
}
