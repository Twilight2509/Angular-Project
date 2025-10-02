import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-books-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    HttpClientModule
  ],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: any[] = [];
  users: any[] = []; // Để chọn user trong modal
  selectedBookId: string = '';
  quantity: number = 0;
  selectedUserId: string = '';
  transactionType: 'import' | 'export' = 'import';

  constructor(private apiService: ApiService, private modal: NzModalService) {}

  ngOnInit() {
    this.loadBooks();
    this.loadUsers(); // Để chọn user trong modal
  }

  loadBooks() {
    this.apiService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  loadUsers() {
    this.apiService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  openModal(type: 'import' | 'export') {
    this.transactionType = type;
    this.modal.create({
      nzTitle: type === 'import' ? 'Nhập sách' : 'Xuất sách',
      nzContent: TransactionModalComponent,
      nzData: {
        books: this.books,
        users: this.users
      },
      nzOnOk: (component: TransactionModalComponent) => {
        const transaction = {
          id: `tx_${Date.now()}`,
          bookId: component.selectedBookId,
          userId: component.selectedUserId,
          type: this.transactionType,
          quantity: component.quantity,
          date: new Date().toISOString()
        };
        this.apiService.createTransaction(transaction).subscribe(() => {
          this.loadBooks(); // Reload nếu cần cập nhật stock (nhưng stock trong books cần update thủ công nếu server không auto)
        });
      }
    });
  }
}

// Component modal riêng (tạo mới)
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'transaction-modal',
  standalone: true,
  imports: [FormsModule, NzFormModule, NzInputModule, NzSelectModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-label>Chọn sách</nz-form-label>
        <nz-form-control>
          <nz-select [(ngModel)]="selectedBookId" nzPlaceHolder="Chọn sách" name="book">
            <nz-option *ngFor="let book of books" [nzValue]="book.id" [nzLabel]="book.title"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Chọn user</nz-form-label>
        <nz-form-control>
          <nz-select [(ngModel)]="selectedUserId" nzPlaceHolder="Chọn user" name="user">
            <nz-option *ngFor="let user of users" [nzValue]="user.id" [nzLabel]="user.name"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label>Số lượng</nz-form-label>
        <nz-form-control>
          <input nz-input type="number" [(ngModel)]="quantity" name="quantity" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class TransactionModalComponent {
  books: any[] = [];
  users: any[] = [];
  selectedBookId: string = '';
  selectedUserId: string = '';
  quantity: number = 0;
}