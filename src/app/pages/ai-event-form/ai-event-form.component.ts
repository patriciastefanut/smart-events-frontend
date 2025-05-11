import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ai-event-form',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './ai-event-form.component.html',
  styleUrl: './ai-event-form.component.css'
})
export class AiEventFormComponent {

  aiForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private api: EventService) {
    this.aiForm = this.fb.group({
      eventType: ['', Validators.required],
      from: ['', Validators.required],
      until: ['', Validators.required],
      location: ['', Validators.required],
      guestCount: ['', Validators.required],
      budget: ['', Validators.required],
      currency: ['', Validators.required],
      preferences: [''],
      vibe: [''],
      specialRequests: ['']
    });
  }

  submitAIForm() {
    if (!this.aiForm.valid) {
      this.aiForm.markAllAsTouched();
      return;
    }

    const input = this.aiForm.value;

    this.api.aiGenerateEvent(input).subscribe({
      next: (res) => {
        console.info(res);
        this.router.navigate(['/events']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
