import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiEventFormComponent } from './ai-event-form.component';

describe('AiEventFormComponent', () => {
  let component: AiEventFormComponent;
  let fixture: ComponentFixture<AiEventFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiEventFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiEventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
