import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
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
    NzSelectModule
  ],
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: any[] = [];
  transactionType: 'import' | 'export' = 'import';

  constructor(private apiService: ApiService, private modal: NzModalService) {}

  ngOnInit() {
    this.loadBooks();
  }

  loadBooks() {
    this.apiService.getBooks().subscribe(data => {
      this.books = data;
    });
  }

  openModal(type: 'import' | 'export') {
    this.transactionType = type;
    this.modal.create({
      nzTitle: type === 'import' ? 'Nhập sách' : 'Xuất sách',
      nzContent: TransactionModalComponent,
      nzData: { books: this.books },
      nzOnOk: (component: TransactionModalComponent) => {
        const existingBook = this.books.find(b => b.id === component.inputBookId);

        if (existingBook) {

          if (this.transactionType === 'import') {
            existingBook.stock += component.quantity;
          } else {
            existingBook.stock -= component.quantity;
          }
          this.apiService.updateBook(existingBook.id, existingBook).subscribe();
        } else {

          const newBook = {
            id: component.inputBookId,
            title: component.inputTitle,
            author: component.inputAuthor,
            stock: component.quantity
          };
          this.apiService.createBook(newBook).subscribe();
        }


        const transaction = {
          id: `tx_${Date.now()}`,
          bookId: component.inputBookId,
          type: this.transactionType,
          quantity: component.quantity,
          date: new Date().toISOString()
        };
        this.apiService.createTransaction(transaction).subscribe(() => {
          this.loadBooks();
        });
      }
    });
  }
}


@Component({
  selector: 'transaction-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule],
  template: `
    <form nz-form>

      <nz-form-item>
        <nz-form-label>Chọn sách</nz-form-label>
        <nz-form-control>
          <nz-select
            [(ngModel)]="selectedBookId"
            name="book"
            nzPlaceHolder="Chọn sách"
            (ngModelChange)="onBookSelect($event)">
            <ng-container *ngFor="let book of books">
              <nz-option [nzValue]="book.id" [nzLabel]="book.title"></nz-option>
            </ng-container>
          </nz-select>
        </nz-form-control>
      </nz-form-item>


      <nz-form-item>
        <nz-form-label>ID sách</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="inputBookId" name="bookId" placeholder="Nhập ID sách" />
        </nz-form-control>
      </nz-form-item>


      <nz-form-item>
        <nz-form-label>Tiêu đề</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="inputTitle" name="title" placeholder="Nhập tiêu đề" />
        </nz-form-control>
      </nz-form-item>


      <nz-form-item>
        <nz-form-label>Tác giả</nz-form-label>
        <nz-form-control>
          <input nz-input [(ngModel)]="inputAuthor" name="author" placeholder="Nhập tác giả" />
        </nz-form-control>
      </nz-form-item>


      <nz-form-item>
        <nz-form-label>Số lượng</nz-form-label>
        <nz-form-control>
          <input type="number" nz-input [(ngModel)]="quantity" name="quantity" placeholder="Nhập số lượng" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class TransactionModalComponent {
  books: any[] = [];
  selectedBookId: string = '';
  inputBookId: string = '';
  inputTitle: string = '';
  inputAuthor: string = '';
  quantity: number = 0;

  onBookSelect(bookId: string) {
    const book = this.books.find(b => b.id === bookId);
    if (book) {
      this.inputBookId = book.id;
      this.inputTitle = book.title;
      this.inputAuthor = book.author;
    } else {
      this.inputBookId = '';
      this.inputTitle = '';
      this.inputAuthor = '';
    }
  }
}
