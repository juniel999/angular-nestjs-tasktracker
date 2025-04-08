import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../../../utils/types/Task.type';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);
  private token = localStorage.getItem('access_token');

  getUserTasks() {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.http.get<any>(`${this.apiUrl}/users/tasks`, { headers });
  }

  updateUserTask(id: string, data: any) {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}`, data, {
      headers,
    });
  }
}
