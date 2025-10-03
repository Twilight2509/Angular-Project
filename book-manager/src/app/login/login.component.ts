import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NzFormModule, NzInputModule, NzButtonModule, NzCardModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.router.navigate(['/dashboard']);
  }
}