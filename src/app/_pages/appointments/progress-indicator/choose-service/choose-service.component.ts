import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-service',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './choose-service.component.html',
  styleUrl: './choose-service.component.scss'
})
export class ChooseServiceComponent implements OnInit {

  selectedOption: string | any;
  options: string[] = ['اختيار', 'اختيار', 'اختيار', 'اختيار'];
  isOpen: boolean = false;
  currentIndex: number = -1;

  services = [
    { label: 'اصدار بطاقة الهوية الوطنية جديدة', isChecked: false, isIndeterminate: false },
    { label: 'إصدار شهادة ميلاد جديدة', isChecked: false, isIndeterminate: false },
    { label: 'تسجيل واقعة ميلاد سعودي تمت خارج المملكة', isChecked: false, isIndeterminate: false },
    { label: 'تجديد بطاقة الهوية الوطنية', isChecked: false, isIndeterminate: false },
    { label: 'إصدار شهادة ميلاد بدل عن المفقودة أو التالفة', isChecked: false, isIndeterminate: false },
    { label: 'تسجيل واقعة زواج سعودية من أجنبي', isChecked: false, isIndeterminate: false }
  ];

  chunkedServices: any[][] = [];

  ngOnInit(): void {
    this.chunkedServices = this.chunkArray(this.services, 3);
  }

  chunkArray(myArray: any[], chunk_size: number): any[][] {
    let index = 0;
    const arrayLength = myArray.length;
    const tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      const myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  toggleCheckbox(service: any): void {
    service.isChecked = !service.isChecked;
    service.isIndeterminate = false;
  }


  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.isOpen) {
      if (event.key === 'ArrowDown') {
        this.currentIndex = (this.currentIndex + 1) % this.options.length;
      } else if (event.key === 'ArrowUp') {
        this.currentIndex = (this.currentIndex - 1 + this.options.length) % this.options.length;
      } else if (event.key === 'Enter') {
        if (this.currentIndex >= 0 && this.currentIndex < this.options.length) {
          this.selectOption(this.options[this.currentIndex]);
        }
      } else if (event.key === 'Escape') {
        this.isOpen = false;
      }
    } else {
      if (event.key === 'ArrowDown') {
        this.isOpen = true;
        this.currentIndex = 0;
      }
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }
}