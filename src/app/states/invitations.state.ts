import { signal, computed, Injectable } from '@angular/core';
import { Invitation } from '../models/invitation';

@Injectable({providedIn: 'root'})
export class InvitationsState {

    private _invitations = signal<Invitation[]>([]);

    invitations = computed(() => this._invitations);

    setInvitations(invitations: Invitation[]) {
        this._invitations.set(invitations);
    }

    clearInvitations(): void {
        this._invitations.set([]);
    }
}
