import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAppointmentComponent } from './choose-appointment.component';

describe('ChooseAppointmentComponent', () => {
  let component: ChooseAppointmentComponent;
  let fixture: ComponentFixture<ChooseAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChooseAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
