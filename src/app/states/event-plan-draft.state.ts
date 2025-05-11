import { signal, computed, Injectable } from '@angular/core';
import { EventPlanDraft } from '../models/eventPlanDraft';

@Injectable({ providedIn: 'root' })
export class EventPlanDraftState {

    private _eventPlanDraft = signal<EventPlanDraft | null>(null);

    eventPlanDraft = computed(() => this._eventPlanDraft);

    setEventPlanDraft(newEventPlanDraft: EventPlanDraft | null) {
        this._eventPlanDraft.set(newEventPlanDraft);
    }

    clearEventPlanDraft(): void {
        this._eventPlanDraft.set(null);
    }
}
