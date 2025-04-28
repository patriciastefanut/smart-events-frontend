import { signal, computed } from '@angular/core';
import { Event } from '../models/event';

export class EventState {

    private _event = signal<Event | null>(null);

    event = computed(() => this._event);

    setEvent(newEvent: Event | null) {
        this._event.set(newEvent);
    }

    clearEvent(): void {
        this._event.set(null);
    }
}
