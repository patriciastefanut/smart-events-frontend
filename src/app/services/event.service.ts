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
    respondToInvitation(eventUUID: string, invitationUUID: string, data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/${eventUUID}/invitations/${invitationUUID}`, data);
    }

    cancelInvitation(eventUUID: string, invitationUUID: string): Observable<Response> {
        return this.http.delete<Response>(`${this.url}/${eventUUID}/invitations/${invitationUUID}`);
    }

    // Private Routes - Events
    createEventPlanDraft(data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}/drafts`, data);
    }

    createEvent(data: any): Observable<Response> {
        return this.http.post<Response>(`${this.url}`, data);
    }

    getAllEventsByUser(): Observable<Response> {
        return this.http.get<Response>(`${this.url}`);
    }

    getEventByIdAndOrganizer(eventId: string): Observable<Response> {
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

    getInvitationsByEventAndOrganizer(eventId: string): Observable<Response> {
        return this.http.get<Response>(`${this.url}/${eventId}/invitations`);
    }

    // Participants
    getParticipantsByEventAndOrganizer(eventId: string): Observable<Response> {
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
}

