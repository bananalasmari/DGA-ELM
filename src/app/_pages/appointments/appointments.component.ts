import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss'
})
export class AppointmentsComponent implements OnInit {
  title: string = 'مواعيد الأحوال';
  welcomeMessage: string = 'مرحبا بك بخدمة المواعيد للأحوال المدنية';
  description: string = 'خدمة المواعيد تسمح للمواطن حجز موعد بفروع الأحوال المدنية لإجراء أي خدمة والإستفادة من المميزات التالية:';
  features: string[] = [
    'حجز موعد جديد',
    'التحديث على موعد حالي',
    'الإطلاع / طباعة موعد حالي',
    'إلغاء موعد حالي'
  ];
  videoLink: string = '#';
  videoLabel: string = 'عرض الفيديو التوضيحي للخدمة';
  buttonLabel: string = 'الإنتقال لخدمة المواعيد';
  iconSrc: string = '../../../assets/images/app-icon.svg';

  constructor() { }

  ngOnInit(): void { }
}
