import { signal, computed } from '@angular/core';
import { User } from '../models/user';

export class UserState {

    private _user = signal<User | null>(null);

    user = computed(() => this._user);

    setUser(newUser: User | null) {
        this._user.set(newUser);
    }

    clearUser(): void {
        this._user.set(null);
    }
}
