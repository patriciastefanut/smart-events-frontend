import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSpendingsComponent } from './event-spendings.component';

describe('EventSpendingsComponent', () => {
  let component: EventSpendingsComponent;
  let fixture: ComponentFixture<EventSpendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventSpendingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSpendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
