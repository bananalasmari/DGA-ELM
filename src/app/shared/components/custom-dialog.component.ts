import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-choose-service-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dialog-overlay" (click)="onClose()">
      <div class="dialog-content" (click)="$event.stopPropagation()">
        <h1 class="modal__heading">تنويه</h1>
        <h5 class="fw-light">حجز موعد لإصدار الهوية الوطنية من دون تسجيل الدخول على حسابك في منصة أبشر لن يمكنك من الاستفادة من خدمة طلب توصيل الهوية، للاستفادة من الخدمة يرجى تسجيل الدخول إلى منصة أبشر.</h5>
        <div class="dialog-actions">
          <button class="btn btn--md btn--secondary px-120" (click)="onClose()">لا</button>
          <button class="btn btn--md btn--primary-brand px-120" (click)="onConfirm()">التالي</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .dialog-content {
      background: white;
      padding: 20px;
      border-radius: 5px;
      width: 600px;
      max-width: 600px;
      text-align: right;
    }
    .dialog-actions {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  `]
})
export class ChooseServiceDialogComponent {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onConfirm(): void {
    this.confirm.emit();
  }
}