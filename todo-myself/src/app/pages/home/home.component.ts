import { Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NzTypographyModule, NzButtonModule],
  template: `
    <nz-typography>
      <h1>Welcome to My App</h1>
      <p>This is the home page.</p>
      <button nz-button nzType="primary">Get Started</button>
    </nz-typography>
  `
})
export class HomeComponent {}
