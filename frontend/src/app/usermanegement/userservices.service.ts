import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usermanegement } from './usermanegement';

@Injectable({
  providedIn: 'root'
})
export class UserservicesService {
  private apiUrl = 'http://localhost:8082/api/admin';

  constructor(private http: HttpClient) { }

  selectedUsermanegementId: number | null = null;
  private selectedUsermanegementIdSubject = new BehaviorSubject<number | null>(null);
  selectedUsermanegementId$ = this.selectedUsermanegementIdSubject.asObservable();

  private selectedUsermanegementSubject = new BehaviorSubject<Usermanegement | null>(null);
  selectedUsermanegement$ = this.selectedUsermanegementSubject.asObservable();

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }
  createUser(name: string, email: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, { name, email, role });
  }
  updateUser(id: number, name: string, email: string, role: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, { name, email, role });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
  sendVerificationCode(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-verification-code`, { email });
  }
  emailExists(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/user-exists`, { params: { email } });
  }
  verifyCode(email: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify-code`, { email, code });
  }

  setPassword(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/set-password`, { email, password });
  }
  setSelectedUsermanegement(usermanegement: Usermanegement): void {
    this.selectedUsermanegementSubject.next(usermanegement);
  }
  getCodeExpirationTime(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/get-code-expiration-time`, { params: { email } });
  }
}
