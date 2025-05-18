import { signal, computed, Injectable } from '@angular/core';
import { Spending } from '../models/spending';

@Injectable({ providedIn: 'root' })
export class SpendingState {

    private _spending = signal<Spending | null>(null);
    private _spendings = signal<Spending[]>([]);

    spending = computed(() => this._spending());
    spendings = computed(() => this._spendings());

    setSpending(spending: Spending): void {
        this._spending.set(spending);
    }

    clearSpending(): void {
        this._spending.set(null);
    }

    setSpendings(spendings: Spending[]): void {
        this._spendings.set(spendings);
    }

    clearSpendings(): void {
        this._spendings.set([]);
    }

    addSpendings(spendings: Spending[]): void {
        this._spendings.update(current => [...current, ...spendings]);
    }

    addSpending(spending: Spending): void {
        this._spendings.update(current => [...current, spending]);
    }

    removeSpending(spendingId: string): void {
        this._spendings.update(current => current.filter(s => s.id !== spendingId));
    }

    updateSpending(updated: Spending): void {
        this._spendings.update(current =>
            current.map(s => s.id === updated.id ? updated : s)
        );
    }
}
