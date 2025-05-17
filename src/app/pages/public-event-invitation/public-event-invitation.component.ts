import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { Invitation } from '../../models/invitation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-event-invitation',
  imports: [CommonModule],
  templateUrl: './public-event-invitation.component.html',
  styleUrl: './public-event-invitation.component.css'
})
export class PublicEventInvitationComponent implements OnInit {

  invitation!: Invitation;
  eventUUID = '';
  invitationUUID = '';
  status: "pending" | "accepted" | "declined" | "cancelled" | '' = '';

  invitationStatuses: string[] = ["pending", "accepted", "declined", "cancelled"];

  constructor(private api: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.eventUUID = this.route.snapshot.paramMap.get('eventUUID') || '';
    this.invitationUUID = this.route.snapshot.paramMap.get('invitationUUID') || "";
    if (this.eventUUID && this.invitationUUID) {
      this.getInvitation();
    }
  }

  getInvitation() {
    this.api.getInvitation(this.eventUUID, this.invitationUUID).subscribe({
      next: (res) => {
        this.invitation = res['invitation'];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  respondToInvitation() {

    this.api.respondToInvitation(this.eventUUID, this.invitationUUID, { status: this.status }).subscribe({
      next: (res) => {
        this.invitation = res['invitation'];
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  acceptInvitation() {
    const confirmAccept = window.confirm('Are you sure you want to accept the invitation?');
    if (!confirmAccept) return;
    this.status = 'accepted';
    this.respondToInvitation();
    console.log('accept invite');
  }

  declineInvitation() {
    const confirmAccept = window.confirm('Are you sure you want to decline the invitation?');
    if (!confirmAccept) return;
    this.status = 'declined';
    this.respondToInvitation();
    console.log('decline invite');
  }


  cancelInvitation() {
    const confirmAccept = window.confirm('Are you sure you want to cancel the invitation?');
    if (!confirmAccept) return;

    console.log('cancel invite');

    this.api.cancelInvitation(this.eventUUID, this.invitationUUID).subscribe({
      next: (res) => {
        this.invitation.status = 'cancelled';
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
