import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private http = inject(HttpClient);

  registerUser(
    username: string,
    name: string,
    email: string,
    password: string
  ) {
    const user = { username, name, email, password };

    return this.http.post(`${this.apiUrl}/users`, user);
  }

  loginUser(username: string, password: string) {
    const user = { username, password };

    return this.http.post<{ access_token: string }>(
      `${this.apiUrl}/auth/login`,
      user
    );
  }
}
