import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'transaction-modal',
  standalone: true,
  imports: [
    CommonModule,       // 👈 để dùng *ngFor, *ngIf
    FormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule
  ],
  template: `
    <form nz-form>
      <!-- Dropdown chọn sách -->
      <nz-form-item>
        <nz-form-label>Chọn sách</nz-form-label>
        <nz-form-control>
          <nz-select
            [(ngModel)]="selectedBookId"
            name="book"
            nzPlaceHolder="Chọn sách"
            (ngModelChange)="onBookSelect($event)">
            
            <!-- Sử dụng ng-container để lặp -->
            <ng-container *ngFor="let book of books">
              <nz-option [nzValue]="book.id" [nzLabel]="book.title"></nz-option>
            </ng-container>

          </nz-select>
        </nz-form-control>
      </nz-form-item>

      <!-- Nhập ID sách -->
      <nz-form-item>
        <nz-form-label>ID sách</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="inputBookId" name="bookId" placeholder="Nhập ID sách" />
        </nz-form-control>
      </nz-form-item>

      <!-- Nhập tiêu đề -->
      <nz-form-item>
        <nz-form-label>Tiêu đề</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="inputTitle" name="title" placeholder="Nhập tiêu đề" />
        </nz-form-control>
      </nz-form-item>

      <!-- Nhập tác giả -->
      <nz-form-item>
        <nz-form-label>Tác giả</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="inputAuthor" name="author" placeholder="Nhập tác giả" />
        </nz-form-control>
      </nz-form-item>

      <!-- Nhập số lượng -->
      <nz-form-item>
        <nz-form-label>Số lượng</nz-form-label>
        <nz-form-control>
          <input type="number" nz-input [(ngModel)]="quantity" name="quantity" placeholder="Nhập số lượng" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class TransactionModalComponent implements OnInit {
  books: any[] = [];
  selectedBookId: string = '';
  inputBookId: string = '';
  inputTitle: string = '';
  inputAuthor: string = '';
  quantity: number = 0;

  ngOnInit() {
    console.log('📚 Books list passed to modal:', this.books.map(b => b.title));
  }

  onBookSelect(bookId: string) {
    const selectedBook = this.books.find(b => b.id === bookId);
    if (selectedBook) {
      this.inputBookId = selectedBook.id;
      this.inputTitle = selectedBook.title;
      this.inputAuthor = selectedBook.author;
    } else {
      this.inputBookId = '';
      this.inputTitle = '';
      this.inputAuthor = '';
    }
  }
}
