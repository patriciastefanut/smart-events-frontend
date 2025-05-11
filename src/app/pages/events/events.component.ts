import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Event } from '../../models/event'; // adjust path
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { EventState } from '../../states/event.state';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];

  constructor(private router: Router, private api: EventService) { }

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {

    this.api.getAllEventsByUser().subscribe({
      next: (res) => {
        this.events = res['events'];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  viewEvent(eventId: string) {
    this.router.navigate(['/events', eventId]);
  }

  addNewEvent(type: 'ai' | 'manual') {
    this.router.navigate([`/events/create-${type}`,]);
  }
}
