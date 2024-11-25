// listeprix.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListeDePrix } from './listeprix'; // Ensure this path is correct

@Injectable({
  providedIn: 'root',
})
export class ListeDePrixService {
  private apiUrl = 'http://localhost:8082/api/ListeDePrixs'; // Adjusted to match the Spring Boot controller's RequestMapping

  constructor(private httpClient: HttpClient) {}
  selectedId: number | null = null;
  private selectedIdSubject = new BehaviorSubject<number | null>(null);
  selectedId$ = this.selectedIdSubject.asObservable();
  getAllListeDePrix(): Observable<ListeDePrix[]> {
    return this.httpClient.get<ListeDePrix[]>(this.apiUrl);
  }
// In ListeDePrixService
setSelectedId(id: number | null): void {
  this.selectedIdSubject.next(id);
}

  getListeDePrixById(id: number): Observable<ListeDePrix> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<ListeDePrix>(url);
  }

  createListeDePrix(newListeDePrix: ListeDePrix): Observable<ListeDePrix> {
    return this.httpClient.post<ListeDePrix>(this.apiUrl, newListeDePrix);
  }

  updateListeDePrix(id: number, updatedListeDePrix: ListeDePrix): Observable<ListeDePrix> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<ListeDePrix>(url, updatedListeDePrix);
  }

  deleteListeDePrix(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
}

}
