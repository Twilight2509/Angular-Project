import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Hỗ trợ *ngFor
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexXAxis
} from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzStatisticModule,
    NzGridModule,
    NzSelectModule,
    FormsModule,
    NzTableModule,
    NzTagModule,
    NgApexchartsModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  totalStock = 300;
  totalUsers = 4;
  totalImport = 180;
  totalExport = 127;

  selectedYear = 2025;

  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Nhập',
      data: [80, 40, 0, 25, 35, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'Xuất',
      data: [0, 20, 25, 30, 22, 30, 0, 0, 0, 0, 0, 0]
    }
  ];

  chartOptions = {
    chart: {
      type: 'bar' as const,
      height: 350
    } as ApexChart,
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      }
    } as ApexPlotOptions,
    dataLabels: {
      enabled: false
    } as ApexDataLabels,
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    } as ApexXAxis,
    colors: ['#1890ff', '#52c41a'] // Không cần ApexColors, chỉ dùng string[]
  };

  booksData = [
    { title: 'Lập Trình JavaScript Cơ Bản', export: 50, stock: 120, price: 100000 },
    { title: 'Học React Từ Zero', export: 37, stock: 80, price: 150000 },
    { title: 'Node.js Backend', export: 22, stock: 40, price: 250000 },
    { title: 'Angular Toàn Tập', export: 18, stock: 0, price: 200000 }
  ];
}