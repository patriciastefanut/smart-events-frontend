import { Component, effect } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventState } from '../../states/event.state';
import { ParticipantsState } from '../../states/participant.state';
import { Participant } from '../../models/participant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-event-participants',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-participants.component.html',
  styleUrls: ['./event-participants.component.css']
})
export class EventParticipantsComponent {
  selectedParticipant: Participant | null = null;
  participants: Participant[] = [];
  eventId = '';

  constructor(
    private eventService: EventService,
    private eventState: EventState,
    private participantState: ParticipantsState
  ) {
    effect(() => {
      this.participants = this.participantState.participants();
      this.eventId = this.eventState.event()?.id || '';
    });
  }

  setSelectedParticipant(participant: Participant) {
    this.selectedParticipant = { ...participant };
  }

  updateParticipant() {
    if (!this.selectedParticipant) return;

    this.eventService
      .updateParticipant(this.eventId, this.selectedParticipant.id, this.selectedParticipant)
      .subscribe(() => this.reloadParticipants());
  }

  deleteParticipant() {
    if (!this.selectedParticipant) return;

    this.eventService
      .deleteParticipant(this.eventId, this.selectedParticipant.id)
      .subscribe(() => this.reloadParticipants());
  }

  reloadParticipants() {
    this.eventService.getParticipantsByEvent(this.eventId).subscribe((res: any) => {
      this.participantState.setParticipants(res['participants']);
    });
  }
}
