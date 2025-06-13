import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Event } from '../../models/event';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: Event[] = [];
  selectedEventId: string | null = null;

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
        console.error(err);
      }
    })
  }

  viewEvent(eventId: string) {
    this.router.navigate(['/events', eventId]);
  }

  addNewEvent(type: 'ai' | 'manual') {
    this.router.navigate([`/events/create-${type}`,]);
  }


  setSelectedEvent(eventId: string) {
    this.selectedEventId = eventId;
  }

  confirmDelete() {
    if (this.selectedEventId) {
      this.api.deleteEvent(this.selectedEventId).subscribe({
        next: () => {
          this.events = this.events.filter(e => e.id !== this.selectedEventId);
          this.selectedEventId = null;
        },
        error: (err) => {
          console.error('Error deleting event', err);
        }
      });
    }
  }
}
