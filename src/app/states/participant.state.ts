import { signal, computed, Injectable } from '@angular/core';
import { Participant } from '../models/participant';

@Injectable({providedIn: 'root'})
export class ParticipantState {

    private _participant = signal<Participant | null>(null);

    participant = computed(() => this._participant);

    setParticipant(participant: Participant | null) {
        this._participant.set(participant);
    }

    clearParticipant(): void {
        this._participant.set(null);
    }
}
