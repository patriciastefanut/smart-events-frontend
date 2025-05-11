import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-manual-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manual-event-form.component.html',
  styleUrls: ['./manual-event-form.component.css'],
})
export class ManualEventFormComponent {
  eventForm: FormGroup;
  budgetKeys = ['venue', 'catering', 'equipment', 'staff', 'miscellaneous'];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router
  ) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      from: ['', Validators.required],
      until: ['', Validators.required],
      guestCount: [0, Validators.required],
      locationName: [''],
      locationAddress: [''],
      locationCost: [0],
      venue: [0],
      catering: [0],
      equipment: [0],
      staff: [0],
      miscellaneous: [0],
      schedule: this.fb.array([]),
      requiredStaff: this.fb.array([]),
      notes: this.fb.array([]),
    });

    // ✅ Prevent render errors by initializing with 1 schedule item
    this.addSchedule();
  }

  get schedule(): FormArray {
    return this.eventForm.get('schedule') as FormArray;
  }
  addSchedule() {
    this.schedule.push(this.fb.group({ time: ['', Validators.required], activity: ['', Validators.required] }));
  }
  removeSchedule(index: number) {
    this.schedule.removeAt(index);
  }

  get requiredStaff(): FormArray {
    return this.eventForm.get('requiredStaff') as FormArray;
  }
  addStaff() {
    this.requiredStaff.push(this.fb.control('', Validators.required));
  }
  removeStaff(index: number) {
    this.requiredStaff.removeAt(index);
  }

  get notes(): FormArray {
    return this.eventForm.get('notes') as FormArray;
  }
  addNote() {
    this.notes.push(this.fb.control('', Validators.required));
  }
  removeNote(index: number) {
    this.notes.removeAt(index);
  }

  onSubmit() {
    if (this.eventForm.invalid) return;

    const f = this.eventForm.value;
    const newEvent = {
      title: f.title,
      type: f.type,
      description: f.description,
      from: new Date(f.from),
      until: new Date(f.until),
      guestCount: f.guestCount,
      location: {
        name: f.locationName,
        address: f.locationAddress,
        cost: f.locationCost,
      },
      budget: {
        venue: f.venue,
        catering: f.catering,
        equipment: f.equipment,
        staff: f.staff,
        miscellaneous: f.miscellaneous,
      },
      currency: 'USD',
      schedule: f.schedule.map((s: any) => ({
        time: new Date(s.time),
        activity: s.activity,
      })),
      requiredStaff: f.requiredStaff,
      notes: f.notes,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.eventService.createEvent(newEvent).subscribe({
      next: () => {
        console.log('Event created:', newEvent);
        this.router.navigate(['/events']);
      },
      error: (err) => console.error('Error creating event:', err),
    });
  }
}
