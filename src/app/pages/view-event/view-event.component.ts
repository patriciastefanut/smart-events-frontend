import { Component, effect, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Event } from '../../models/event';
import { EventState } from '../../states/event.state';
import { InvitationsState } from '../../states/invitations.state';
import { SpendingState } from '../../states/spending.state';
import { ParticipantsState } from '../../states/participant.state';

@Component({
  selector: 'app-view-event',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent implements OnInit {

  event !: Event | null;

  constructor(private api: EventService,
    private eventState: EventState,
    private invitationState: InvitationsState,
    private spendingState: SpendingState,
    private participantsState: ParticipantsState,
    private route: ActivatedRoute,
    private router: Router) {
    effect(() => {
      this.event = this.eventState.event();
    });
  }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');

    if (!eventId) {
      this.router.navigate(['/events'])
      return;
    }


    this.getEvent(eventId);
    this.getInvitations(eventId);
    this.getSpendings(eventId);
    this.getParticipants(eventId);

  }


  getEvent(eventId: string) {
    this.api.getEventById(eventId).subscribe({
      next: (res) => {
        this.eventState.setEvent(res['event']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getInvitations(eventId: string) {
    this.api.getInvitationsByEvent(eventId).subscribe({
      next: (res) => {
        this.invitationState.setInvitations(res['invitations']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getSpendings(eventId: string) {
    this.api.getSpendingsByEvent(eventId).subscribe({
      next: (res) => {
        this.spendingState.setSpendings(res['spendings']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getParticipants(eventId: string) {
    this.api.getParticipantsByEvent(eventId).subscribe({
      next: (res) => {
        this.participantsState.setParticipants(res['participants']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  overView() {
    this.router.navigate(['events', this.event!.id]);
  }

  invitations() {
    this.router.navigate(['events', this.event!.id, 'invitations'])
  }

  spendings() {
    this.router.navigate(['events', this.event!.id, 'spendings'])
  }

  participants() {
    this.router.navigate(['events', this.event!.id, 'participants'])
  }
}
