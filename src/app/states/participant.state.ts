import { signal, computed } from '@angular/core';
import { Participant } from '../models/participant';

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
