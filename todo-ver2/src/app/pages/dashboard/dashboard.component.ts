import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../shared/services/task.service';
import { Task } from '../../shared/models/task';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ngx-apexcharts';
import { NgxApexchartsModule } from 'ngx-apexcharts'; // Add this import
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgxApexchartsModule, // Add to imports
    NzLayoutModule,
    NzGridModule,
    NzCardModule,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public barChartOptions!: Partial<BarChartOptions> | any;
  public pieChartOptions!: Partial<PieChartOptions> | any;

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.initCharts();
    });
  }

  initCharts(): void {
    // Bar chart: Nhiệm vụ hoàn thành theo ngày/tuần/tháng (mock stats)
    this.barChartOptions = {
      series: [{ name: 'Hoàn thành', data: [5, 10, 15] }],
      chart: { height: 350, type: 'bar' },
      xaxis: { categories: ['Ngày', 'Tuần', 'Tháng'] },
      stroke: { show: true, width: 2 },
      tooltip: { y: { formatter: (val: number) => val + ' nhiệm vụ' } },
      dataLabels: { enabled: false }
    };

    // Pie chart: Trạng thái
    const statusCounts = {
      pending: this.tasks.filter(t => t.status === 'pending').length,
      'in-progress': this.tasks.filter(t => t.status === 'in-progress').length,
      completed: this.tasks.filter(t => t.status === 'completed').length
    };
    this.pieChartOptions = {
      series: [statusCounts.pending, statusCounts['in-progress'], statusCounts.completed],
      chart: { width: 380, type: 'pie' },
      labels: ['Pending', 'In Progress', 'Completed'],
      responsive: [{ breakpoint: 480, options: { chart: { width: 200 }, legend: { position: 'bottom' } } }]
    };
  }
}
