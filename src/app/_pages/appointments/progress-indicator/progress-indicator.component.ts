import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableAppointmentComponent } from './available-appointment/available-appointment.component';
import { ChooseServiceComponent } from './choose-service/choose-service.component';
import { ChooseBranchComponent } from './choose-branch/choose-branch.component';
import { ChooseAppointmentComponent } from './choose-appointment/choose-appointment.component';
import { ConfrimAppointmentComponent } from './confrim-appointment/confrim-appointment.component';
import { AppointmentTicketComponent } from './appointment-ticket/appointment-ticket.component';

interface Step {
  label: string;
  state: 'completed' | 'current' | 'upcoming';
  component: any;
}

@Component({
  selector: 'app-progress-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
  title: string = 'مواعيد الأحوال - قائمة المواعيد';
  currentStepIndex: number = 0;

  steps: Step[] = [
    { label: 'المواعيد المتاحة', state: 'current', component: AvailableAppointmentComponent },
    { label: 'اختيار الخدمة', state: 'upcoming', component: ChooseServiceComponent },
    { label: 'اختيار الفرع', state: 'upcoming', component: ChooseBranchComponent },
    { label: 'اختيار الموعد', state: 'upcoming', component: ChooseAppointmentComponent },
    { label: 'تأكيد الموعد', state: 'upcoming', component: ConfrimAppointmentComponent },
    { label: 'تذكرة الموعد', state: 'upcoming', component: AppointmentTicketComponent }
  ];

  constructor() { }

  ngOnInit(): void {
    const savedStepIndex = localStorage.getItem('currentStepIndex');
    if (savedStepIndex !== null) {
      this.currentStepIndex = +savedStepIndex;
      this.updateStepStates();
    }
  }

  nextStep(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.steps[this.currentStepIndex].state = 'completed';
      this.currentStepIndex++;
      this.steps[this.currentStepIndex].state = 'current';
      this.saveCurrentStepIndex();
    }
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      this.steps[this.currentStepIndex].state = 'upcoming';
      this.currentStepIndex--;
      this.steps[this.currentStepIndex].state = 'current';
      this.saveCurrentStepIndex();
    }
  }

  private saveCurrentStepIndex(): void {
    localStorage.setItem('currentStepIndex', this.currentStepIndex.toString());
  }

  private updateStepStates(): void {
    this.steps.forEach((step, index) => {
      if (index < this.currentStepIndex) {
        step.state = 'completed';
      } else if (index === this.currentStepIndex) {
        step.state = 'current';
      } else {
        step.state = 'upcoming';
      }
    });
  }
}