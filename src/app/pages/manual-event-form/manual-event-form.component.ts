import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Event } from '../../models/event';

@Component({
  selector: 'app-manual-event-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './manual-event-form.component.html',
  styleUrls: ['./manual-event-form.component.css'],
})
export class ManualEventFormComponent {
  eventId: string | null = null;
  eventForm!: FormGroup;
  budgetKeys = ['venue', 'catering', 'equipment', 'staff', 'miscellaneous'];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    this.eventId ? this.initFilledForm() : this.initEmptyForm();
  }

  initEmptyForm() {
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
    this.addSchedule();
  }

  initFilledForm() {
    this.initEmptyForm();
    this.eventService.getEventById(this.eventId!).subscribe({
      next: (res) => {
        const event: Event = res['event'];
        this.eventForm.patchValue({
          title: event.title,
          type: event.type,
          description: event.description,
          from: this.formatDateForInput(event.from),
          until: this.formatDateForInput(event.until),
          guestCount: event.guestCount,
          locationName: event.location.name,
          locationAddress: event.location.address,
          locationCost: event.location.cost,
          venue: event.budget.venue,
          catering: event.budget.catering,
          equipment: event.budget.equipment,
          staff: event.budget.staff,
          miscellaneous: event.budget.miscellaneous,
        });

        this.setArrayValues(this.schedule, event.schedule.map(s => ({
          time: this.formatDateForInput(s.time),
          activity: s.activity
        })));

        this.setArrayValues(this.requiredStaff, event.requiredStaff);
        this.setArrayValues(this.notes, event.notes);
      },
      error: (err) => console.error('Failed to load event:', err),
    });
  }

  formatDateForInput(date: Date | string): string {
    const d = new Date(date);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  }

  setArrayValues(array: FormArray, values: any[]) {
    array.clear();
    values.forEach(val => {
      if (typeof val === 'string') {
        array.push(this.fb.control(val, Validators.required));
      } else {
        array.push(this.fb.group({
          time: [val.time, Validators.required],
          activity: [val.activity, Validators.required]
        }));
      }
    });
  }

  get schedule(): FormArray {
    return this.eventForm.get('schedule') as FormArray;
  }
  addSchedule() {
    this.schedule.push(this.fb.group({
      time: ['', Validators.required],
      activity: ['', Validators.required]
    }));
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
    const payload = {
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
      updatedAt: new Date(),
    };

    const request$ = this.eventId
      ? this.eventService.updateEvent(this.eventId, payload)
      : this.eventService.createEvent({ ...payload, createdAt: new Date() });

    request$.subscribe({
      next: () => {
        this.router.navigate(['/events']);
      },
      error: (err) => console.error('Error saving event:', err),
    });
  }
}
