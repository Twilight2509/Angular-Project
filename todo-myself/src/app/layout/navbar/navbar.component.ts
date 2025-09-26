import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NzMenuModule, RouterLink],
  template: `
    <nz-menu nzMode="horizontal">
      <nz-menu-item><a routerLink="/home">Home</a></nz-menu-item>
      <nz-menu-item><a routerLink="/dashboard">Dashboard</a></nz-menu-item>
      <nz-menu-item><a routerLink="/users">Users</a></nz-menu-item>
    </nz-menu>
  `,
  styles: [`
    nz-menu {
      background: #fff;
      border-bottom: 1px solid #e8e8e8;
    }
  `]
})
export class NavbarComponent {}
