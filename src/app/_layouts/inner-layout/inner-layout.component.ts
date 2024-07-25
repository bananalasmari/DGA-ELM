import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-inner-layout',
  standalone: true,
  imports: [HeaderComponent,FooterComponent, RouterOutlet ],
  templateUrl: './inner-layout.component.html',
  styleUrl: './inner-layout.component.scss'
})
export class InnerLayoutComponent {

}
