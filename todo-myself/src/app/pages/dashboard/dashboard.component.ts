import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NzCardModule, NzGridModule],
  template: `
    <div nz-row nzGutter="16">
      <div nz-col nzSpan="8">
        <nz-card nzTitle="Users" [nzBordered]="false">
          <h3>1200</h3>
          <p>Total active users</p>
        </nz-card>
      </div>
      <div nz-col nzSpan="8">
        <nz-card nzTitle="Revenue" [nzBordered]="false">
          <h3>$5000</h3>
          <p>This month</p>
        </nz-card>
      </div>
      <div nz-col nzSpan="8">
        <nz-card nzTitle="Orders" [nzBordered]="false">
          <h3>350</h3>
          <p>Pending orders</p>
        </nz-card>
      </div>
    </div>
  `
})
export class DashboardComponent {}
