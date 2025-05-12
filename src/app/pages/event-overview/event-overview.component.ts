import { Component, effect, Input } from '@angular/core';
import { Event } from '../../models/event';
import { CommonModule } from '@angular/common';
import { EventState } from '../../states/event.state';

@Component({
  selector: 'app-event-overview',
  imports: [CommonModule],
  templateUrl: './event-overview.component.html',
  styleUrl: './event-overview.component.css'
})
export class EventOverviewComponent {

  event !: Event | null;

  constructor(private eventState: EventState) {
    effect(() => {
      this.event = this.eventState.event();
    })
  }
}
