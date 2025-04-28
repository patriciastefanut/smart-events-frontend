import { signal, computed } from '@angular/core';

export class AuthState {

    private _token = signal<string | null>(localStorage.getItem('token') || null);
    
    isLoggedIn = computed(() => this._token() !== null);
    token = computed(() => this._token);

    setToken(newToken: string | null) {
        this._token.set(newToken);
        if (newToken) {
            localStorage.setItem('authToken', newToken);
        } else {
            localStorage.removeItem('authToken');
        }
    }

    clearToken(): void {
        this._token.set(null);
    }
}
