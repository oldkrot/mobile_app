import { VerificationComponent } from './verification/verification.component';
import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome.component';


export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: WelcomeComponent },
  { path: 'verification', component: VerificationComponent },
  { path: '**', redirectTo: 'home' }
];
