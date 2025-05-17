import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicEventInvitationComponent } from './public-event-invitation.component';

describe('PublicEventInvitationComponent', () => {
  let component: PublicEventInvitationComponent;
  let fixture: ComponentFixture<PublicEventInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicEventInvitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicEventInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
