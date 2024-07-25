import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfrimAppointmentComponent } from './confrim-appointment.component';

describe('ConfrimAppointmentComponent', () => {
  let component: ConfrimAppointmentComponent;
  let fixture: ComponentFixture<ConfrimAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfrimAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfrimAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
