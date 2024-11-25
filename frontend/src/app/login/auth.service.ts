import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from './LoginRequest';
import { JwtResponse } from './JwtResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8082/api/auth'; // Adjust the URL according to your backend setup

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.baseUrl}/login`, loginRequest, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  saveToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem('jwtToken');
  }

  getUserRoles(): string[] {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // console.log("Payload:", payload);
      const rolesString = payload.role;
      // Strip brackets and split by comma
      const rolesArray = rolesString.substring(1, rolesString.length - 1).split(',').map((role: string) => role.trim());
 
      return rolesArray;
    }
    return [];
  }
  isSuperAdmin(): boolean {
    return this.getUserRoles().includes('SUPERADMIN');
  }
}
