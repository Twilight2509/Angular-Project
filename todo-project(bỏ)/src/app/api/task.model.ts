// src/app/api/task.model.ts
export interface Task {
  id: number;
  title: string;
  content: string;
  time: string; // Định dạng ISO 8601
  type: string; // Ví dụ: 'warning', 'success', 'error'
}