import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-choose-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePickerComponent],
  templateUrl: './choose-appointment.component.html',
  styleUrls: ['./choose-appointment.component.scss']
})
export class ChooseAppointmentComponent implements OnInit {
  showTable: boolean = false;
  selectedRadio: string = '';

  // Times from 7 AM to 5 PM
  times: string[] = [
    '٧ صباحاً', '٨ صباحاً', '٩ صباحاً', '١٠ صباحاً', '١١ صباحاً', '١٢ مساءً',
    '١ مساءً', '٢ مساءً', '٣ مساءً', '٤ مساءً', '٥ مساءً'
  ];

  // Array of unavailable times
  unavailableTimes: string[] = ['٩ صباحاً', '١١ صباحاً', '٣ مساءً'];

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
    console.log('Selected appointment:', value);
  }

  preventSelection(event: Event) {
    event.preventDefault();
  }

  isUnavailable(time: string): boolean {
    return this.unavailableTimes.includes(time);
  }
}
