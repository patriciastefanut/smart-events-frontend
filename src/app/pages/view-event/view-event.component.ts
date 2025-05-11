import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Event } from '../../models/event';

@Component({
  selector: 'app-view-event',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './view-event.component.html',
  styleUrl: './view-event.component.css'
})
export class ViewEventComponent implements OnInit {

  event !: Event;

  constructor(private api: EventService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');

    if (!eventId) {
      this.router.navigate(['/events'])
      return;
    }

    this.api.getEventById(eventId).subscribe({
      next: (res) => {
        console.log(res);
        this.event = res['event'];
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
