import { Component } from '@angular/core';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NzCalendarMode, NzCalendarModule } from 'ng-zorro-antd/calendar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    FormsModule, 
    NzCalendarModule
  ],
   template: `<nz-calendar [(ngModel)]="date" [(nzMode)]="mode" (nzPanelChange)="panelChange($event)"></nz-calendar>`
})
export class HomeComponent {
   date = new Date(2012, 11, 21);
  mode: NzCalendarMode = 'month';

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }
}