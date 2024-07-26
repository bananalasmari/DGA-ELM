import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-choose-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePickerComponent],
  templateUrl: './choose-appointment.component.html',
  styleUrl: './choose-appointment.component.scss'
})
export class ChooseAppointmentComponent {

  showTable: boolean = false;
  rows: any[] = Array(6).fill({});
  selectedRadio: string = '';

  ngOnInit() {
    this.loadStateFromLocalStorage();
  }

  searchAppointments() {
    this.showTable = true;
    this.saveStateToLocalStorage();
  }

  saveStateToLocalStorage() {
    localStorage.setItem('showTable', JSON.stringify(this.showTable));
  }

  loadStateFromLocalStorage() {
    const showTable = localStorage.getItem('showTable');
    if (showTable) {
      this.showTable = JSON.parse(showTable);
    }
  }

  onRadioChange(value: string) {
    this.selectedRadio = value;
  }
}
