import { Component } from '@angular/core';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NzTypographyModule],
  template: `
    <footer style="text-align: center; padding: 20px;">
      <nz-typography>© 2025 My App. All rights reserved.</nz-typography>
    </footer>
  `
})
export class FooterComponent {}
