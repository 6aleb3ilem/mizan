// Status.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { Status } from './status';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Client } from '../client/client';
import { Tache } from '../tache/tache';
import { Item } from '../item/item';
import { Project } from '../projets/project';
import { Devisf } from '../devisf/devisf';


@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private apiUrl = 'http://localhost:8082/api/Status'; // URL de l'API REST pour les unités
  private apiUrldevis = 'http://localhost:8082/api/devis'; // Remplacez par l'URL de votre backend
  private apiUrlclient = 'http://localhost:8082/api/clients'; // Remplacez par l'URL de votre backend
  private apiUrltache = 'http://localhost:8082/api/tasks'; // Remplacez par l'URL de votre backend
  private apiUrlitem = 'http://localhost:8082/api/elementdevis'; // Remplacez par l'URL de votre backend
  private apiUrlprojet = 'http://localhost:8082/api/Project';

  constructor(private http: HttpClient) { }
  selectedStatusId: number | null = null;
  private selectedStatusIdSubject = new BehaviorSubject<number | null>(null);
  selectedStatusId$ = this.selectedStatusIdSubject.asObservable();
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrlclient, { withCredentials: true });
  }
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrlprojet);
  }
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrlitem, { withCredentials: true });
  }
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrltache, { withCredentials: true });
  }
  // Récupérer toutes les unités
  getAllStatuss(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrl);
  }
  getAllDevis(): Observable<Devisf[]> {
    return this.http.get<Devisf[]>(this.apiUrldevis, { withCredentials: true });
  }
  // Récupérer une unité par son ID
  getStatusById(id: number): Observable<Status> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Status>(url);
  }

  // Créer une nouvelle unité
  createStatus(status: Status): Observable<Status> {
    return this.http.post<Status>(this.apiUrl, status, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Simple error handling
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    alert('Ce status existe déja'); // Alert the user
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Mettre à jour une unité existante
  updateStatus(id: number, status: Status): Observable<Status> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Status>(url, status);
  }

  // Supprimer une unité existante
  deleteStatusById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

StatusToUpdate: Status | null = null; // Stocke les données du Status à mettre à jour

openUpdateModal(StatusId: number) {
  this.selectedStatusIdSubject.next(StatusId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}
