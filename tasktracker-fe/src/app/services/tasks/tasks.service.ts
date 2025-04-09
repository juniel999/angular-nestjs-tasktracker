import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../../../utils/types/Task.type';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);

  private get headers() {
    const token = localStorage.getItem('access_token');
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  getUserTasks() {
    return this.http.get<any>(`${this.apiUrl}/users/tasks`, {
      headers: this.headers,
    });
  }

  createUserTask(data: Partial<Task>) {
    return this.http.post<Task>(`${this.apiUrl}/tasks`, data, {
      headers: this.headers,
    });
  }

  updateUserTask(id: string, data: any) {
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`, data, {
      headers: this.headers,
    });
  }
}
