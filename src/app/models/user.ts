export interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    profilePicture: string | null,
    createdAt: Date,
    updatedAt: Date,
}