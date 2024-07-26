import { Routes } from '@angular/router';
import { LandingComponent } from './_pages/landing/landing.component';
import { AppointmentsComponent } from './_pages/appointments/appointments.component';
import { InnerLayoutComponent } from './_layouts/inner-layout/inner-layout.component';
import { ProgressIndicatorComponent } from './_pages/appointments/progress-indicator/progress-indicator.component'
export const routes: Routes = [
    {
        path: '',
        component: InnerLayoutComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          { path: 'home', component: LandingComponent },
          { path: 'appointment', component: AppointmentsComponent },
          { path: 'reserve', component: ProgressIndicatorComponent },
        ]
      },
      { path: '**', redirectTo: 'home' }
];
