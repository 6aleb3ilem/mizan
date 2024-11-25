// Situation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { Situation } from './situation';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../projets/project';


@Injectable({
  providedIn: 'root'
})
export class SituationService {

  private apiUrl = 'http://localhost:8082/api/Situations'; // URL de l'API REST pour les unités
  private apiUrlprojet = 'http://localhost:8082/api/Project';

  constructor(private http: HttpClient) { }
  selectedSituationId: number | null = null;
  private selectedSituationIdSubject = new BehaviorSubject<number | null>(null);
  selectedSituationId$ = this.selectedSituationIdSubject.asObservable();

  // Récupérer toutes les unités
  getAllSituations(): Observable<Situation[]> {
    return this.http.get<Situation[]>(this.apiUrl);
  }
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrlprojet);
  }
  // Récupérer une unité par son ID
  getSituationById(id: number): Observable<Situation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Situation>(url);
  }

  // Créer une nouvelle unité
  createSituation(situation: Situation): Observable<Situation> {
    return this.http.post<Situation>(this.apiUrl, situation, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Simple error handling
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    alert('Ce situation existe déja'); // Alert the user
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Mettre à jour une unité existante
  updateSituation(id: number, situation: Situation): Observable<Situation> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Situation>(url, situation);
  }

  // Supprimer une unité existante
  deleteSituationById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

SituationToUpdate: Situation | null = null; // Stocke les données du Situation à mettre à jour

openUpdateModal(SituationId: number) {
  this.selectedSituationIdSubject.next(SituationId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}
