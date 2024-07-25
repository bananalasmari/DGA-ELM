import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentTicketComponent } from './appointment-ticket.component';

describe('AppointmentTicketComponent', () => {
  let component: AppointmentTicketComponent;
  let fixture: ComponentFixture<AppointmentTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentTicketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppointmentTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
