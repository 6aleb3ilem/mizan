// unite.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Unite } from './unite';
import { BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Tarif } from '../tarif/tarif';
@Injectable({
  providedIn: 'root'
})
export class UniteService {

  private apiUrl = 'http://localhost:8082/api/unites'; // URL de l'API REST pour les unités
  private apiUrltarif = 'http://localhost:8082/api/tarifs';

  constructor(private http: HttpClient) { }
  selectedUniteId: number | null = null;
  private selectedUniteIdSubject = new BehaviorSubject<number | null>(null);
  selectedUniteId$ = this.selectedUniteIdSubject.asObservable();
  getAllTarifs(): Observable<Tarif[]> {
    return this.http.get<Tarif[]>(this.apiUrltarif);
  }
  // Récupérer toutes les unités
  getAllUnites(): Observable<Unite[]> {
    return this.http.get<Unite[]>(this.apiUrl);
  }

  // Récupérer une unité par son ID
  getUniteById(id: number): Observable<Unite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Unite>(url);
  }

  // Créer une nouvelle unité

  createUnite(unite: any): Observable<any> {
    return this.http.post(this.apiUrl, unite).pipe(
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
  updateUnite(id: number, unite: Unite): Observable<Unite> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Unite>(url, unite);
  }

  // Supprimer une unité existante
  deleteUniteById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  UniteToUpdate: Unite | null = null; // Stocke les données du Unite à mettre à jour

openUpdateModal(UniteId: number) {
  this.selectedUniteIdSubject.next(UniteId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}