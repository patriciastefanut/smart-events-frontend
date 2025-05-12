import { signal, computed, Injectable } from '@angular/core';
import { Event } from '../models/event';

@Injectable({ providedIn: 'root' })
export class EventState {

    private _event = signal<Event | null>(null);

    event = computed(() => this._event());

    setEvent(newEvent: Event | null) {
        this._event.set(newEvent);
    }

    clearEvent(): void {
        this._event.set(null);
    }
}
