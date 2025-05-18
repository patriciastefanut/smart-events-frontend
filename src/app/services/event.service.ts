import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../models/response';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private url = `${environment.api}/events`;

    constructor(private http: HttpClient) { }

    // Feedbacks (Public Routes)
    createFeedback(eventUUID: string, data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/${eventUUID}/feedbacks`, data);
    }

    getFeedback(eventUUID: string, feedbackUUID: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventUUID}/feedbacks/${feedbackUUID}`);
    }

    updateFeedback(eventUUID: string, feedbackUUID: string, data: any): Observable<Response> {
        return this.http.patch<Response>(`${this.url}/${eventUUID}/feedbacks/${feedbackUUID}`, data);
    }

    deleteFeedback(eventUUID: string, feedbackUUID: string): Observable<Response> {
        return this.http.delete<Response>(`${this.url}/${eventUUID}/feedbacks/${feedbackUUID}`);
    }

    // Invitations (Public Routes)

    getInvitation(eventUUID: string, invitationUUID: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventUUID}/invitations/${invitationUUID}`);
    }

    respondToInvitation(eventUUID: string, invitationUUID: string, data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/${eventUUID}/invitations/${invitationUUID}`, data);
    }

    cancelInvitation(eventUUID: string, invitationUUID: string): Observable<Response> {
        return this.http.delete<Response>(`${this.url}/${eventUUID}/invitations/${invitationUUID}`);
    }

    // Private Routes - Events
    aiGenerateEvent(data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/ai`, data);
    }

    createEvent(data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}`, data);
    }

    getAllEventsByUser(): Observable<Response> {
        return this.http.get<Response>(`${this.url}`);
    }

    getEventById(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}`);
    }

    updateEvent(eventId: string, data: any): Observable<Response> {
        return this.http.patch<Response>(`${this.url}/${eventId}`, data);
    }

    deleteEvent(eventId: string): Observable<Response> {
        return this.http.delete<Response>(`${this.url}/${eventId}`);
    }

    generateReport(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/report`);
    }

    // Invitations (Private Routes)
    sendInvitations(eventId: string, data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/${eventId}/invitations`, data);
    }

    getInvitationsByEvent(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/invitations`);
    }

    // Participants
    getParticipantsByEvent(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/participants`);
    }

    getParticipantByIdAndEvent(eventId: string, participantId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/participants/${participantId}`);
    }

    updateParticipant(eventId: string, participantId: string, data: any): Observable<Response> {
        return this.http.patch<Response>(`${this.url}/${eventId}/participants/${participantId}`, data);
    }

    deleteParticipant(eventId: string, participantId: string): Observable<Response> {
        return this.http.delete<Response>(`${this.url}/${eventId}/participants/${participantId}`);
    }

    // Feedback (Private Route)
    getEventFeedbacks(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/feedbacks`);
    }


    // Spendings
    getSpendingsByEvent(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/spendings`);
    }

    getSpendingById(eventId: string, spendingId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/spendings/${spendingId}`);
    }

    createSpending(eventId: string, data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/${eventId}/spendings`, data);
    }

    updateSpending(eventId: string, spendingId: string, data: any): Observable<Response> {
        return this.http.patch<Response>(`${this.url}/${eventId}/spendings/${spendingId}`, data);
    }

    deleteSpending(eventId: string, spendingId: string): Observable<Response> {
        return this.http.delete<Response>(`${this.url}/${eventId}/spendings/${spendingId}`);
    }
}

