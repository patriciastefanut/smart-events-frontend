import { signal, computed, Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';

@Injectable({providedIn: 'root'})
export class FeedbackState {

    private _feedback = signal<Feedback | null>(null);

    feedback = computed(() => this._feedback);

    setFeedback(feedback: Feedback | null) {
        this._feedback.set(feedback);
    }

    clearFeedback(): void {
        this._feedback.set(null);
    }
}
