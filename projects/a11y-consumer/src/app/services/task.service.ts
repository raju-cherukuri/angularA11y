import {inject, Injectable} from '@angular/core';
import {Category, Task} from "../models/task";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly API_URL = 'http://localhost:3000';
  private  readonly http = inject(HttpClient);

  constructor() {
  }

  addTask(task: Task) {
  }

  editTask(task: Task) {
  }

  deleteTask(taskId: number) {
  }

  moveTask(task: Task, taskId: number, categoryId: number) {
  }

  getAllTasks(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.API_URL}/categories`)
  }

  getCategories(): Category[] {
    return [];
  }

  getTasksByCategory(categoryId: number): Task[] {
    return [];
  }
}
