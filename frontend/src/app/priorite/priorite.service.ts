// Priorite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { Priorite } from './priorite';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tache } from '../tache/tache';


@Injectable({
  providedIn: 'root'
})
export class PrioriteService {

  private apiUrl = 'http://localhost:8082/api/priorites'; // URL de l'API REST pour les unités
  private apiUrltache = 'http://localhost:8082/api/tasks'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }
  selectedPrioriteId: number | null = null;
  private selectedPrioriteIdSubject = new BehaviorSubject<number | null>(null);
  selectedPrioriteId$ = this.selectedPrioriteIdSubject.asObservable();

  // Récupérer toutes les unités
  getAllPriorites(): Observable<Priorite[]> {
    return this.http.get<Priorite[]>(this.apiUrl);
  }
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrltache, { withCredentials: true });
  }
  // Récupérer une unité par son ID
  getPrioriteById(id: number): Observable<Priorite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Priorite>(url);
  }

  // Créer une nouvelle unité
  createPriorite(priorite: Priorite): Observable<Priorite> {
    return this.http.post<Priorite>(this.apiUrl, priorite, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Simple error handling
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    alert('Ce priorite existe déja'); // Alert the user
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Mettre à jour une unité existante
  updatePriorite(id: number, priorite: Priorite): Observable<Priorite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Priorite>(url, priorite);
  }

  // Supprimer une unité existante
  deletePrioriteById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

PrioriteToUpdate: Priorite | null = null; // Stocke les données du Priorite à mettre à jour

openUpdateModal(PrioriteId: number) {
  this.selectedPrioriteIdSubject.next(PrioriteId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}
