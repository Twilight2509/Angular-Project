import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Desc 1', dueDate: new Date('2025-09-27'), status: 'pending', priority: 'high' },
    { id: 2, title: 'Task 2', description: 'Desc 2', dueDate: new Date('2025-10-01'), status: 'completed', priority: 'medium' },
    // Thêm mock data khác...
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  addTask(task: Task): Observable<Task> {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    return of(task);
  }

  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (index !== -1) this.tasks[index] = task;
    return of(task);
  }

  deleteTask(id: number): Observable<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    return of();
  }
}
