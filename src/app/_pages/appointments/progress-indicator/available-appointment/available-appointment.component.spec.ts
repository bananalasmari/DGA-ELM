import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableAppointmentComponent } from './available-appointment.component';

describe('AvailableAppointmentComponent', () => {
  let component: AvailableAppointmentComponent;
  let fixture: ComponentFixture<AvailableAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailableAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvailableAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
