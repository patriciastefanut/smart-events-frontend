import { signal, computed, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthState {

    private _token = signal<string | null>(localStorage.getItem('token') || null);
    private _userId = signal<string | null>(localStorage.getItem('userId') || null);
    private _tokenExpiresIn = signal<Date | null>(
        localStorage.getItem('tokenExpiresIn') ? new Date(localStorage.getItem('tokenExpiresIn')!) : null
    );

    isLoggedIn = computed(() =>
        this._token() !== null &&
        this._tokenExpiresIn() !== null &&
        new Date() < this._tokenExpiresIn()!
    );

    token = computed(() => this._token());
    userId = computed(() => this._userId());

    constructor(private router: Router) { }

    setToken(newToken: string | null) {
        this._token.set(newToken);

        if (newToken) {
            localStorage.setItem('token', newToken);

            const expiry = new Date(Date.now() + 60 * 60 * 1000);
            this._tokenExpiresIn.set(expiry);
            localStorage.setItem('tokenExpiresIn', expiry.toISOString());
        } else {
            localStorage.removeItem('token');
            this._tokenExpiresIn.set(null);
            localStorage.removeItem('tokenExpiresIn');
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
        this.router.navigate(['/login']);
    }
}
