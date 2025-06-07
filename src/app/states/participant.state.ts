import { signal, computed, Injectable } from '@angular/core';
import { Participant } from '../models/participant';

@Injectable({ providedIn: 'root' })
export class ParticipantsState {

    private _participants = signal<Participant[]>([]);

    participants = computed(() => this._participants());

    setParticipants(participants: Participant[]) {
        this._participants.set(participants);
    }

    clearParticipants(): void {
        this._participants.set([]);
    }
}
