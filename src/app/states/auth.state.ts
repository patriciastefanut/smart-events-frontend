import { signal, computed, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthState {

    private _token = signal<string | null>(localStorage.getItem('token') || null);
    private _userId = signal<string | null>(localStorage.getItem('userId') || null);


    isLoggedIn = computed(() => this._token() !== null);
    token = computed(() => this._token());
    userId = computed(() => this._userId());

    setToken(newToken: string | null) {
        this._token.set(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    }

    setUserId(userId: string | null) {
        this._userId.set(userId);
        if (userId) {
            localStorage.setItem('userId', userId);
        } else {
            localStorage.removeItem('userId');
        }
    }

    logout() {
        this.setToken(null);
        this.setUserId(null);
    }
}
