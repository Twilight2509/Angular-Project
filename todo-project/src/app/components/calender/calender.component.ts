import { Component, OnInit } from '@angular/core';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzAlertModule } from 'ng-zorro-antd/alert'; // Add NzAlertModule
import { TaskService } from '../../api/task.service';
import { Task } from '../../api/task.model';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-calender',
  standalone: true,
  imports: [NzBadgeModule, NzCalendarModule, NzAlertModule], // Add NzAlertModule
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  tasksByDate: { [key: string]: Task[] } = {};
  monthTaskCounts: { [key: number]: number } = {};
  errorMessage: string | null = null;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().pipe(
      catchError(error => {
        console.error('HttpErrorResponse details:', error);
        this.errorMessage = `Failed to load tasks: ${error.message}`;
        return of([] as Task[]);
      })
    ).subscribe(tasks => {
      if (tasks.length > 0) {
        this.processTasks(tasks);
      } else {
        console.warn('No tasks loaded');
      }
    });
  }

  private processTasks(tasks: Task[]) {
    this.tasksByDate = {};
    this.monthTaskCounts = {};
    tasks.forEach(task => {
      const taskDate = new Date(task.time);
      if (isNaN(taskDate.getTime())) {
        console.warn('Invalid ISO date:', task.time);
        return;
      }
      const dateKey = taskDate.toISOString().split('T')[0];
      const monthKey = taskDate.getMonth();

      this.tasksByDate[dateKey] = [...(this.tasksByDate[dateKey] || []), task];
      this.monthTaskCounts[monthKey] = (this.monthTaskCounts[monthKey] || 0) + 1;
    });
  }

  getTasksForDate(date: Date): Task[] {
    const dateKey = date.toISOString().split('T')[0];
    return this.tasksByDate[dateKey] || [];
  }

  getMonthData(date: Date): number | null {
    return this.monthTaskCounts[date.getMonth()] || null;
  }
}