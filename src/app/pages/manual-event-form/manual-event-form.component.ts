import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Event } from '../../models/event';

@Component({
  selector: 'app-manual-event-form',
  templateUrl: './manual-event-form.component.html',
  styleUrls: ['./manual-event-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class ManualEventFormComponent {

}
