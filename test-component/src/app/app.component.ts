import { Component } from '@angular/core';
import { NzDemoCalendarBasicComponent } from './nz-demo-calendar-basic-component/nz-demo-calendar-basic-component.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NzDemoCalendarBasicComponent, FooterComponent, NavbarComponent, FooterComponent],
  template: `
  <app-navbar></app-navbar>
  <app-nz-demo-calendar-basic></app-nz-demo-calendar-basic>
  <app-footer></app-footer>`
})
export class AppComponent {
  title = "Nahhhh";
}
