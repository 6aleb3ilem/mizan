import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { tacheref } from './tacheref';
import { Tache } from '../tache/tache';
@Injectable({
  providedIn: 'root'
})
export class TacherefService {

  private apiUrl = 'http://localhost:8082/api/taches'; // URL de l'API REST pour les unités
  private apiUrltache = 'http://localhost:8082/api/tasks'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }
  selectedtacherefId: number | null = null;
  private selectedtacherefIdSubject = new BehaviorSubject<number | null>(null);
  selectedtacherefId$ = this.selectedtacherefIdSubject.asObservable();

  // Récupérer toutes les unités
  getAlltacherefs(): Observable<tacheref[]> {
    return this.http.get<tacheref[]>(this.apiUrl);
  }
  getAllTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.apiUrltache, { withCredentials: true });
  }
  // Récupérer une unité par son ID
  gettacherefById(id: number): Observable<tacheref> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<tacheref>(url);
  }

  // Créer une nouvelle unité

  createtacheref(tacheref: any): Observable<any> {
    return this.http.post(this.apiUrl, tacheref).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 400) {
      // Ici, vous pouvez personnaliser l'affichage de l'erreur
      // Utiliser `error.error` pour accéder au message d'erreur du backend
      alert(`Erreur : ${error.error}`);
    } else {
      // Gestion des autres types d'erreurs HTTP
      console.error(`Erreur backend : code ${error.status}, ` + `corps était : ${error.error}`);
    }
    // Retourner un Observable avec une erreur pour permettre à l'abonné de gérer également l'erreur
    return throwError(() => new Error('Quelque chose de mal s\'est produit; veuillez réessayer plus tard.'));
  }

  // Mettre à jour une unité existante
  updatetacheref(id: number, tacheref: tacheref): Observable<tacheref> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<tacheref>(url, tacheref);
  }

  // Supprimer une unité existante
  deletetacherefById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  tacherefToUpdate: tacheref | null = null; // Stocke les données du Unite à mettre à jour

openUpdateModal(id: number) {
  this.selectedtacherefIdSubject.next(id);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}}
