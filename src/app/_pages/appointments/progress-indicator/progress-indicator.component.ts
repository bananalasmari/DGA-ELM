import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailableAppointmentComponent } from './available-appointment/available-appointment.component';
import { ChooseServiceComponent } from './choose-service/choose-service.component';
import { ChooseBranchComponent } from './choose-branch/choose-branch.component';
import { ChooseAppointmentComponent } from './choose-appointment/choose-appointment.component';
import { ConfrimAppointmentComponent } from './confrim-appointment/confrim-appointment.component';
import { AppointmentTicketComponent } from './appointment-ticket/appointment-ticket.component';
import { ChooseServiceDialogComponent } from '../../../shared/components/custom-dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  imports: [
    CommonModule,
    ChooseServiceDialogComponent,
    AvailableAppointmentComponent,
    ChooseServiceComponent,
    ChooseBranchComponent,
    ChooseAppointmentComponent,
    ConfrimAppointmentComponent,
    AppointmentTicketComponent
  ],
  templateUrl: './progress-indicator.component.html',
  styleUrls: ['./progress-indicator.component.scss']
})
export class ProgressIndicatorComponent implements OnInit {
  title: string = 'مواعيد الأحوال - قائمة المواعيد';
  currentStepIndex: number = 0;
  showDialog: boolean = false;
  finalStage: boolean = false; // Track if at final stage

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
    this.loadStateFromLocalStorage();
  }

  nextStep(): void {
    console.log("Next step triggered");
    if (this.currentStepIndex < this.steps.length - 1) {
      console.log("Proceeding to the next step");
      if (this.steps[this.currentStepIndex].nextAction) {
        this.steps[this.currentStepIndex].nextAction!();
      } else {
        this.defaultNext();
      }
    }

    // Check if at the final stage
    if (this.currentStepIndex === this.steps.length - 1) {
      console.log("Reached the final stage");
      this.finalStage = true;
    }
  }

  previousStep(): void {
    console.log("Previous step triggered");
    if (this.currentStepIndex > 0) {
      if (this.steps[this.currentStepIndex].previousAction) {
        this.steps[this.currentStepIndex].previousAction!();
      } else {
        this.defaultPrevious();
      }
    }
  }

  chooseServiceNext() {
    this.showDialog = true;
  }

  onDialogClose() {
    this.showDialog = false;
  }

  onDialogConfirm() {
    this.showDialog = false;
    this.defaultNext();
    this.saveStateToLocalStorage();
  }

  availableAppointmentNext() {
    this.defaultNext();
  }

  chooseBranchNext() {
    this.defaultNext();
  }

  chooseAppointmentNext() {
    this.defaultNext();
  }

  confirmAppointmentNext() {
    this.defaultNext();
  }

  appointmentTicketNext() {
    this.defaultNext();
  }

  defaultNext() {
    console.log("Default next step triggered");
    this.steps[this.currentStepIndex].state = 'completed';
    this.currentStepIndex++;
    this.steps[this.currentStepIndex].state = 'current';
    this.saveStateToLocalStorage();

    // Check if at the final stage
    if (this.currentStepIndex === this.steps.length - 1) {
      console.log("Reached the final stage in defaultNext");
      this.finalStage = true;
    } else {
      this.finalStage = false;
    }
  }

  defaultPrevious() {
    console.log("Default previous step triggered");
    this.steps[this.currentStepIndex].state = 'upcoming';
    this.currentStepIndex--;
    this.steps[this.currentStepIndex].state = 'current';
    this.saveStateToLocalStorage();

    // Update final stage status
    this.finalStage = this.currentStepIndex === this.steps.length - 1;
  }

  saveStateToLocalStorage() {
    localStorage.setItem('currentStepIndex', this.currentStepIndex.toString());
  }

  loadStateFromLocalStorage() {
    const savedIndex = localStorage.getItem('currentStepIndex');
    if (savedIndex !== null) {
      this.currentStepIndex = +savedIndex;
    }

    this.steps.forEach((step, index) => {
      if (index < this.currentStepIndex) {
        step.state = 'completed';
      } else if (index === this.currentStepIndex) {
        step.state = 'current';
      } else {
        step.state = 'upcoming';
      }
    });

    // Check if at the final stage
    this.finalStage = this.currentStepIndex === this.steps.length - 1;
  }

  backToAppointment() {
    this.steps.forEach(step => step.state = 'upcoming'); // Reset all steps to upcoming
    this.currentStepIndex = 0;
    this.steps[this.currentStepIndex].state = 'current'; // Set the first step to current
    this.finalStage = false; // Ensure final stage is set to false
    this.saveStateToLocalStorage(); // Save the state to local storage
  }

  printAppointment() {
    window.print();
  }

  async downloadAppointment() {
    const doc = new jsPDF();
    const element = document.body; // Or specify a specific element to print
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const imgWidth = 210; // A4 size width in mm
    const pageHeight = 295; // A4 size height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      doc.addPage();
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    doc.save('appointment.pdf');
  }
}
