import { Routes } from '@angular/router';
import { NzDemoCalendarBasicComponent } from './nz-demo-calendar-basic-component/nz-demo-calendar-basic-component.component';

export const routes: Routes = [
  { path: '', component: NzDemoCalendarBasicComponent },
  // nếu cần thêm page khác:
  // { path: 'about', component: AboutComponent }
];
