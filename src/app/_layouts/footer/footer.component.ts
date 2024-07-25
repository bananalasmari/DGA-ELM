import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  aboutPlatform: string[] = ['عن أبشر', 'سياسة الخصوصية', 'شروط الاستخدام', 'الاخبار', 'اتفاقية مستوى الخدمة'];
  support: string[] = ['اتصل بنا', 'بلاغ عن فساد (نزاهة)', 'الأسئلة الشائعة', 'قنوات الخدمة', 'قنوات تفعيل الهوية الوطنية الرقمية'];
  importantLinks: string[] = ['بوابة وزارة الداخلية', 'الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي', 'منصة البيانات المفتوحة', 'بوابة المشاركة الالكترونية'];
  socialMedia: { alt: string, src: string }[] = [
    { alt: 'Snapchat', src: '../../../assets/images/snapchat.svg' },
    { alt: 'Facebook', src: '../../../assets/images/facebook.svg' },
    { alt: 'X', src: '../../../assets/images/X.svg' },
    { alt: 'YouTube', src: '../../../assets/images/youtube.svg' }
  ];
  tools: { alt: string, src: string }[] = [
    { alt: 'view', src: '../../../assets/images/view.svg' },
    { alt: 'max', src: '../../../assets/images/maxumize.svg' }
  ];
  footerCopyright: string = 'جميع الحقوق محفوظة لأبشر، المملكة العربية السعودية © 1446هـ - 2024م - تطوير وتشغيل مركز المعلومات الوطني';

  constructor() { }

  ngOnInit(): void {
  }
}
