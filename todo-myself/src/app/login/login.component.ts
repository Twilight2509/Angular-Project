import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule], // Add ReactiveFormsModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: any;

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required]),
      remember: this.fb.control(true)
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      console.log('form invalid');
    }
  }
}
