import { Component, effect } from '@angular/core';
import { EventService } from '../../services/event.service';
import { InvitationsState } from '../../states/invitations.state';
import { Invitation } from '../../models/invitation';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventState } from '../../states/event.state';

@Component({
  selector: 'app-event-invitations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-invitations.component.html',
  styleUrls: ['./event-invitations.component.css']
})
export class EventInvitationsComponent {
  invitations: Invitation[] = [];

  contacts: { firstname: string; lastname: string; email: string }[] = [
    { firstname: '', lastname: '', email: '' }
  ];
  respondBefore = '';
  eventId = '';

  constructor(
    private invitationState: InvitationsState,
    private eventService: EventService,
    private eventState: EventState
  ) {
    effect(() => {
      this.invitations = this.invitationState.invitations();
      this.eventId = this.eventState.event()?.id || '';
    });
  }

  addContact() {
    this.contacts.push({ firstname: '', lastname: '', email: '' });
  }

  removeContact(index: number) {
    this.contacts.splice(index, 1);
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const validContacts = this.contacts.filter(
      c => c.email.trim() !== ''
    );

    const payload = {
      contacts: validContacts,
      respondBefore: this.respondBefore,
    };

    this.eventService.sendInvitations(this.eventId, payload).subscribe({
      next: (res) => {
        this.clearForm();
        this.invitationState.addInvitations(res['invitations']);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  clearForm() {
    this.contacts = [{ firstname: '', lastname: '', email: '' }];
    this.respondBefore = '';
  }
}
