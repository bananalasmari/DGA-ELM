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
  nextAction?: () => void;
  previousAction?: () => void;
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
    { label: 'المواعيد المتاحة', state: 'current', component: AvailableAppointmentComponent, nextAction: () => this.availableAppointmentNext(), previousAction: () => this.defaultPrevious() },
    { label: 'اختيار الخدمة', state: 'upcoming', component: ChooseServiceComponent, nextAction: () => this.chooseServiceNext(), previousAction: () => this.defaultPrevious() },
    { label: 'اختيار الفرع', state: 'upcoming', component: ChooseBranchComponent, nextAction: () => this.chooseBranchNext(), previousAction: () => this.defaultPrevious() },
    { label: 'اختيار الموعد', state: 'upcoming', component: ChooseAppointmentComponent, nextAction: () => this.chooseAppointmentNext(), previousAction: () => this.defaultPrevious() },
    { label: 'تأكيد الموعد', state: 'upcoming', component: ConfrimAppointmentComponent, nextAction: () => this.confirmAppointmentNext(), previousAction: () => this.defaultPrevious() },
    { label: 'تذكرة الموعد', state: 'upcoming', component: AppointmentTicketComponent, nextAction: () => this.appointmentTicketNext(), previousAction: () => this.defaultPrevious() }
  ];

  constructor() { }

  ngOnInit(): void {
    const savedIndex = localStorage.getItem('currentStepIndex');
    if (savedIndex) {
      this.currentStepIndex = +savedIndex;
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

  nextStep(): void {
    if (this.currentStepIndex < this.steps.length - 1) {
      if (this.steps[this.currentStepIndex].nextAction) {
        this.steps[this.currentStepIndex].nextAction!();
      }
      this.steps[this.currentStepIndex].state = 'completed';
      this.currentStepIndex++;
      this.steps[this.currentStepIndex].state = 'current';
      localStorage.setItem('currentStepIndex', this.currentStepIndex.toString());
    }
  }

  previousStep(): void {
    if (this.currentStepIndex > 0) {
      if (this.steps[this.currentStepIndex].previousAction) {
        this.steps[this.currentStepIndex].previousAction!();
      }
      this.steps[this.currentStepIndex].state = 'upcoming';
      this.currentStepIndex--;
      this.steps[this.currentStepIndex].state = 'current';
      localStorage.setItem('currentStepIndex', this.currentStepIndex.toString());
    }
  }

  availableAppointmentNext() {
    console.log('Available Appointment Next Action');
  }

  chooseServiceNext() {
    console.log('Choose Service Next Action');
  }

  chooseBranchNext() {
    console.log('Choose Branch Next Action');
  }

  chooseAppointmentNext() {
    console.log('Choose Appointment Next Action');
  }

  confirmAppointmentNext() {
    console.log('Confirm Appointment Next Action');
  }

  appointmentTicketNext() {
    console.log('Appointment Ticket Next Action');
  }

  defaultPrevious() {
    console.log('Default Previous Action');
  }
}