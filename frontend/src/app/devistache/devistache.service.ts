// devistache.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../tache/tache'; // Assurez-vous d'avoir le modèle Tache défini
import { Devis } from '../devis/devis'; // Assurez-vous d'avoir le modèle Devis défini
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DevistacheService {

  private apiUrl = 'http://localhost:8082/api/tasks'; // URL de base de l'API
  selectedDevistacheId: number | null = null;
  selectedDevistacheIdSubject = new BehaviorSubject<number | null>(null);
  selectedDevistacheId$ = this.selectedDevistacheIdSubject.asObservable();
  constructor(private http: HttpClient) { }

  getTasksWithNoDevis(projectId: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/${projectId}/tasks/no-devis`);
  }

  getTasksByDevisId(devisId: number): Observable<Tache[]> {
    return this.http.get<Tache[]>(`${this.apiUrl}/devis/${devisId}/tasks`);
  }

  addTaskToDevis(taskId: number, devis: Devis): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/addTask/${taskId}/toDevis`, devis);
  }

  deleteTaskFromDevis(taskId: number): Observable<Tache> {
    return this.http.put<Tache>(`${this.apiUrl}/deleteTask/${taskId}/FromDevis`, {});
  }
}
