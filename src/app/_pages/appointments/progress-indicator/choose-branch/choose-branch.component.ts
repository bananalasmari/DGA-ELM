import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePickerComponent } from '../../../../shared/components/date-picker/date-picker.component';

interface Branch {
  name: string;
  location: string;
}

@Component({
  selector: 'app-choose-branch',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePickerComponent],
  templateUrl: './choose-branch.component.html',
  styleUrls: ['./choose-branch.component.scss'],
})
export class ChooseBranchComponent implements OnInit {
  showTable: boolean = true; // Set to true to show the table
  selectedRadio: string = '';

  // Branches array
  branches: Branch[] = [
    { name: 'احوال الخرج - نساء', location: 'الخرج' },
    { name: 'احوال الدوادمي - نساء', location: 'الدوادمي' },
    { name: 'احوال الزلفي - نساء', location: 'الزلفي' },
    { name: 'احوال حريملاء - نساء', location: 'حريملاء' },
    { name: 'احوال ضرماء - نساء', location: 'ضرماء' },
    { name: 'احوال الدرعية - نساء', location: 'الدرعية' }
  ];

  @Output() branchSelected = new EventEmitter<void>();

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

  // Method to handle selection and emit event
  selectBranch() {
    this.branchSelected.emit();
  }
}
