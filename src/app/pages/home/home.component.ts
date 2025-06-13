import { Component, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { EventService } from '../../services/event.service';
import { EventState } from '../../states/event.state';
import { Event } from '../../models/event';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy {

  events: Event[] = [];
  countdowns: { [eventId: string]: string } = {};
  private timerSub?: Subscription;

  constructor(private eventService: EventService, private eventState: EventState) {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getAllEventsByUser().subscribe({
      next: (res) => {
        this.events = res['events'].filter((e: Event) => new Date(e.from) > new Date());
        this.initCountdowns();
      }
    });
  }

  initCountdowns() {
    this.updateCountdowns();
    this.timerSub = interval(1000).subscribe(() => this.updateCountdowns());
  }

  updateCountdowns() {
    const now = new Date().getTime();
    for (const event of this.events) {
      const diff = new Date(event.from).getTime() - now;

      if (diff <= 0) {
        this.countdowns[event.id] = 'Started';
        continue;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      this.countdowns[event.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  }

  ngOnDestroy(): void {
    this.timerSub?.unsubscribe();
  }
}
