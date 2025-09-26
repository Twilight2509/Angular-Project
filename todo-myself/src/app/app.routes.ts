import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.routes').then(m => m.WELCOME_ROUTES) },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent}
];
