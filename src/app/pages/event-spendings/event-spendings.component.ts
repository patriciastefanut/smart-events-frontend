import { Component, effect } from '@angular/core';
import { Spending } from '../../models/spending';
import { SpendingState } from '../../states/spending.state';
import { EventService } from '../../services/event.service';
import { EventState } from '../../states/event.state';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-spendings',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event-spendings.component.html',
  styleUrl: './event-spendings.component.css'
})
export class EventSpendingsComponent {

  eventId = '';
  spendingForm !: FormGroup;
  spendings: Spending[] = [];
  deleteId: string | null = null;
  selectedSpending: Spending | null = null;


  constructor(
    private spendingState: SpendingState,
    private eventService: EventService,
    private eventState: EventState,
    private fb: FormBuilder
  ) {

    this.initForm();

    effect(() => {
      this.spendings = this.spendingState.spendings();
      this.eventId = this.eventState.event()?.id || '';
    });
  }

  initForm() {
    this.spendingForm = this.fb.group({
      title: [this.selectedSpending?.title || '', Validators.required],
      amount: [this.selectedSpending?.amount || 0, [Validators.required, Validators.min(0.01)]],
      currency: [this.selectedSpending?.currency || 'EUR'],
      category: [this.selectedSpending?.category || 'Other'],
      paymentMethod: [this.selectedSpending?.paymentMethod || 'Other'],
      date: [this.selectedSpending?.date || new Date().toISOString().substring(0, 10)],
      isReimbursable: [this.selectedSpending?.isReimbursable || false]
    });
  }

  prepareDelete(id: string): void {
    this.deleteId = id;
  }

  cancelDelete(): void {
    this.deleteId = null;
  }

  confirmDelete(): void {
    if (!this.deleteId || !this.eventId) return;

    this.eventService.deleteSpending(this.eventId, this.deleteId).subscribe({
      next: () => {
        this.spendingState.removeSpending(this.deleteId!);
        this.deleteId = null;
      },
      error: (err) => {
        console.error('Delete failed', err);
      }
    });
  }

  submitNewSpending() {
    if (this.spendingForm.invalid) return;

    if (this.selectedSpending) {
      this.updateSpending();
    } else {
      this.createSpending();
    }
  }

  createSpending() {
    this.eventService.createSpending(this.eventId, this.spendingForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.spendingState.addSpending(res['spending']);
        this.initForm();
        this.selectedSpending = null;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateSpending() {
    this.eventService.updateSpending(this.eventId, this.selectedSpending!.id, this.spendingForm.value).subscribe({
      next: (res) => {
        console.log(res);
        this.spendingState.updateSpending(res['spending']);
        this.initForm();
        this.selectedSpending = null;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addSpending() {
    this.selectedSpending = null;
    this.initForm();
  }

  editSpending(spending: Spending) {
    this.selectedSpending = spending;
    this.initForm();
  }
}
