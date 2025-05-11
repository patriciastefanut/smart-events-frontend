import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEventFormComponent } from './manual-event-form.component';

describe('ManualEventFormComponent', () => {
  let component: ManualEventFormComponent;
  let fixture: ComponentFixture<ManualEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualEventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManualEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
