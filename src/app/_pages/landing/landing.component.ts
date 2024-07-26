import { Component } from '@angular/core';
import { HeaderComponent } from '../../_layouts/header/header.component';
import { FooterComponent } from '../../_layouts/footer/footer.component';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
