import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { ApiService } from '../services/api.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RouterLink } from "@angular/router";

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
    NgApexchartsModule,
    NzDatePickerModule,
    RouterLink
],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalStock = 0;
  totalUsers = 0;
  totalImport = 0;
  totalExport = 0;
  date = new Date();
  chartSeries: ApexAxisChartSeries = [];
  chartOptions = {
    chart: { type: 'bar' as const, height: 350 } as ApexChart,
    plotOptions: { bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded' } } as ApexPlotOptions,
    dataLabels: { enabled: false } as ApexDataLabels,
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] } as ApexXAxis,
    colors: ['#1890ff', '#52c41a']
  };
  booksData: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.chartSeries = [
  { name: 'Nhập', data: [] },
  { name: 'Xuất', data: [] }
];
  this.loadData(this.date.getFullYear());
}

loadData(year: number) {
  this.apiService.getInventoryStats().subscribe(stats => {
    this.totalStock = stats.totalStock;
    this.totalImport = stats.totalImport;
    this.totalExport = stats.totalExport;
    this.totalUsers = stats.totalUsers;
  });

  this.apiService.getBooksWithExport().subscribe(data => {
    this.booksData = data;
  });

  this.apiService.getMonthlyChartData(year).subscribe(series => {
    this.chartSeries = series;
  });
}

onChange(event: Date | null): void {
  if (event) {
    const year = event.getFullYear();
    console.log('Selected year:', year);
    this.loadData(year);
  }
}
}