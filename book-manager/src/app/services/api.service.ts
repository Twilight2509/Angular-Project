import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApexAxisChartSeries } from 'ng-apexcharts';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:9999';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

    updateUser(userId: string, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}`, user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  getBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  createBook(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, book);
  }

  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/transactions`);
  }

  getInventoryStats(): Observable<{ totalStock: number; totalImport: number; totalExport: number; totalUsers: number }> {
    return forkJoin([this.getBooks(), this.getTransactions(), this.getUsers()]).pipe(
      map(([books, transactions, users]) => {
        let totalImport = 0;
        let totalExport = 0;
        transactions.forEach(t => {
          if (t.type === 'import') totalImport += t.quantity;
          if (t.type === 'export') totalExport += t.quantity;
        });
        const totalStock = books.reduce((sum, book) => sum + book.stock, 0);
        return {
          totalStock,
          totalImport,
          totalExport,
          totalUsers: users.length
        };
      })
    );
  }

  getBooksWithExport(): Observable<any[]> {
    return forkJoin([this.getBooks(), this.getTransactions()]).pipe(
      map(([books, transactions]) => {
        const bookMap = new Map(books.map(book => [book.id, { ...book, export: 0 }]));
        transactions.forEach(trans => {
          if (trans.type === 'export') {
            const book = bookMap.get(trans.bookId);
            if (book) book.export += trans.quantity;
          }
        });
        return Array.from(bookMap.values()).map(book => ({
          title: book.title,
          export: book.export,
          stock: book.stock
        }));
      })
    );
  }

  getMonthlyChartData(year: number): Observable<ApexAxisChartSeries> {
  return this.getTransactions().pipe(
    map(transactions => {
      const monthlyData = Array(12).fill(0).map(() => ({ import: 0, export: 0 }));
      transactions.forEach(trans => {
        const date = new Date(trans.date);
        const month = date.getMonth();
        const transYear = date.getFullYear();
        if (transYear === year) {
          if (trans.type === 'import') monthlyData[month].import += trans.quantity;
          if (trans.type === 'export') monthlyData[month].export += trans.quantity;
        }
      });
      const series: ApexAxisChartSeries = [
        { name: 'Nhập', data: monthlyData.map(m => m.import) },
        { name: 'Xuất', data: monthlyData.map(m => m.export) }
      ];
      return series;
    })
  );
}


  createTransaction(transaction: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transaction);
  }

  addBook(book: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/books`, book);
  }

  updateBook(bookId: string, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/books/${bookId}`, book);
  }
}
