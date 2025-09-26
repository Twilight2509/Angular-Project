import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Task } from '../../shared/models/task';
import { TaskService } from '../../shared/services/task.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { addDays, addMonths, addWeeks, startOfDay, startOfMonth, startOfWeek } from 'date-fns';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../../layout/navbar/navbar.component';
import { FooterComponent } from '../../layout/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzDatePickerModule,
    NzSelectModule,
    NzModalModule,
    NzGridModule,
    NzMessageModule,
    DatePipe,
    NavbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskForm!: FormGroup;
  filterForm!: FormGroup;
  isModalVisible = false;
  editMode = false;
  currentTaskId?: number;

  constructor(private fb: FormBuilder, private taskService: TaskService, private message: NzMessageService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: [null, Validators.required],
      status: ['pending'],
      priority: ['medium']
    });

    this.filterForm = this.fb.group({
      period: ['day']
    });

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filteredTasks = tasks;
    });
  }

  filterTasks(): void {
    const period = this.filterForm.value.period;
    const now = new Date();
    let endDate: Date;

    switch (period) {
      case 'day':
        endDate = addDays(startOfDay(now), 1);
        break;
      case 'week':
        endDate = addWeeks(startOfWeek(now), 1);
        break;
      case 'month':
        endDate = addMonths(startOfMonth(now), 1);
        break;
      default:
        endDate = now;
    }

    this.filteredTasks = this.tasks.filter(task => task.dueDate >= now && task.dueDate < endDate);
  }

  openAddModal(): void {
    this.editMode = false;
    this.taskForm.reset({ status: 'pending', priority: 'medium' });
    this.isModalVisible = true;
  }

  openEditModal(task: Task): void {
    this.editMode = true;
    this.currentTaskId = task.id;
    this.taskForm.patchValue(task);
    this.isModalVisible = true;
  }

  handleOk(): void {
    if (this.taskForm.invalid) return;
    const task: Task = this.taskForm.value;
    if (this.editMode && this.currentTaskId) {
      task.id = this.currentTaskId;
      this.taskService.updateTask(task).subscribe(() => {
        this.message.success('Cập nhật thành công');
        this.loadTasks();
      });
    } else {
      this.taskService.addTask(task).subscribe(() => {
        this.message.success('Thêm thành công');
        this.loadTasks();
      });
    }
    this.isModalVisible = false;
  }

  handleCancel(): void {
    this.isModalVisible = false;
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.message.success('Xóa thành công');
      this.loadTasks();
    });
  }

  private loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.filterTasks();
    });
  }
}
