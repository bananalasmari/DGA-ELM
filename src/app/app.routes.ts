import { Routes } from '@angular/router';
import { LandingComponent } from './_pages/landing/landing.component';
import { AppointmentsComponent } from './_pages/appointments/appointments.component';
import { InnerLayoutComponent } from './_layouts/inner-layout/inner-layout.component';

export const routes: Routes = [
    {
        path: '',
        component: InnerLayoutComponent,
        children: [
            { path: 'appointment', component: AppointmentsComponent},
    
        ]
      },
];
