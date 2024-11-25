import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BCT } from './bct';
import { Project } from '../projets/project';
@Injectable({
  providedIn: 'root'
})
export class BctService {

  private apiUrl = 'http://localhost:8082/api/bcts/admin'; // URL de l'API REST pour les unités
  private apiUrlprojet = 'http://localhost:8082/api/Project';

  constructor(private http: HttpClient) { }
  selectedBCTId: number | null = null;
  private selectedBCTIdSubject = new BehaviorSubject<number | null>(null);
  selectedBCTId$ = this.selectedBCTIdSubject.asObservable();

  // Récupérer toutes les unités
  getAllBCTs(): Observable<BCT[]> {
    return this.http.get<BCT[]>(this.apiUrl);
  }
  getAllProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrlprojet);
  }
  // Récupérer une unité par son ID
  getBCTById(id: number): Observable<BCT> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<BCT>(url);
  }

  // Créer une nouvelle unité

  createBCT(bct: any): Observable<any> {
    return this.http.post(this.apiUrl, bct).pipe(
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
  updateBCT(id: number, bct: BCT): Observable<BCT> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<BCT>(url, bct);
  }

  // Supprimer une unité existante
  deleteBCTById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  UniteToUpdate: BCT | null = null; // Stocke les données du Unite à mettre à jour

openUpdateModal(UniteId: number) {
  this.selectedBCTIdSubject.next(UniteId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}}
