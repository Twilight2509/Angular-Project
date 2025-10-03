import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksListComponent } from './books-list/books-list.component';
import { UsersListComponent } from './users-list/users-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'books', component: BooksListComponent },
  { path: 'users', component: UsersListComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];