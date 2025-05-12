import { Component, effect, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Event } from '../../models/event';
import { EventState } from '../../states/event.state';

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

    this.api.getEventById(eventId).subscribe({
      next: (res) => {
        console.log(res);
        this.eventState.setEvent(res['event']);
      },
      error: (err) => {
        console.log(err);
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
    this.router.navigate(['event', this.event!.id, 'spendings'])
  }
}
