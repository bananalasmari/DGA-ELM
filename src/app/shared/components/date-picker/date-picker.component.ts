import { Component, OnInit, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  animations: [
    trigger('datePickerAnimation', [
      state('open', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('closed', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      transition('closed => open', [
        animate('200ms ease-in')
      ]),
      transition('open => closed', [
        animate('200ms ease-out')
      ])
    ])
  ]
})
export class DatePickerComponent {
  currentMonth: Date = new Date();
  selectedDate: Date | null = null;
  dates: Date[] = [];
  weekDays: string[] = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  showDatePicker: boolean = false;

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    const start = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const end = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    this.dates = [];

    // Fill initial empty dates for calendar alignment
    for (let i = start.getDay(); i > 0; i--) {
      const emptyDate = new Date(start);
      emptyDate.setDate(start.getDate() - i);
      this.dates.push(emptyDate);
    }

    // Fill actual dates of the month
    for (let i = 1; i <= end.getDate(); i++) {
      this.dates.push(new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), i));
    }

    // Fill remaining empty dates for calendar alignment
    for (let i = 1; this.dates.length % 7 !== 0; i++) {
      const emptyDate = new Date(end);
      emptyDate.setDate(end.getDate() + i);
      this.dates.push(emptyDate);
    }
  }

  previousMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1);
    this.generateCalendar();
  }

  selectDate(date: Date) {
    if (date.getMonth() === this.currentMonth.getMonth()) {
      this.selectedDate = date;
      this.showDatePicker = false; // Close the date picker when a date is selected
    }
  }

  getDateClass(date: Date): string {
    const classes = [];
    if (date.getMonth() !== this.currentMonth.getMonth()) {
      classes.push('date-cell--disabled');
    }
    if (this.selectedDate && date.toDateString() === this.selectedDate.toDateString()) {
      classes.push('date-cell--selected');
    }
    if (date.toDateString() === new Date().toDateString()) {
      classes.push('date-cell--today');
    }
    return classes.join(' ');
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.date-picker-root') && !targetElement.closest('.input')) {
      this.showDatePicker = false;
    }
  }

  openDatePicker() {
    this.showDatePicker = true;
  }
}

