import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    HttpClientModule
  ],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];

  constructor(private apiService: ApiService, private modal: NzModalService, private message: NzMessageService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  editUser(user: any) {
    this.modal.create({
      nzTitle: 'Sửa user',
      nzContent: UserModalComponent,
      nzData: { user },
      nzOnOk: (component: UserModalComponent) => {
        const updatedUser = {
          ...user,
          name: component.name,
          email: component.email
        };
        this.apiService.updateUser(user.id, updatedUser).subscribe(() => {
          this.message.success('Update thành công');
          this.loadUsers();
        });
      }
    });
  }

  deleteUser(userId: string) {
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa',
      nzContent: 'Bạn chắc chắn muốn xóa user này?',
      nzOnOk: () => {
        this.apiService.deleteUser(userId).subscribe(() => {
          this.message.success('Xóa thành công');
          this.loadUsers();
        });
      }
    });
  }
}

// Component modal sửa user
@Component({
  selector: 'user-modal',
  standalone: true,
  imports: [FormsModule, NzFormModule, NzInputModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-label>Tên</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="name" name="name" />
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Email</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="email" name="email" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class UserModalComponent {
  name: string = '';
  email: string = '';

  constructor() {}
}