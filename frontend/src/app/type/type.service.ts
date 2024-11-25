// Type.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { Type } from './type';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Element } from '../element/element';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private apiUrl = 'http://localhost:8082/api/types'; // URL de l'API REST pour les unités
  private apiUrlelement = 'http://localhost:8082/api/elements'; // URL de l'API REST pour les unités

  constructor(private http: HttpClient) { }
  selectedTypeId: number | null = null;
  private selectedTypeIdSubject = new BehaviorSubject<number | null>(null);
  selectedTypeId$ = this.selectedTypeIdSubject.asObservable();
  getAllElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.apiUrlelement);
  }
  // Récupérer toutes les unités
  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.apiUrl);
  }

  // Récupérer une unité par son ID
  getTypeById(id: number): Observable<Type> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Type>(url);
  }

  // Créer une nouvelle unité
  createType(type: Type): Observable<Type> {
    return this.http.post<Type>(this.apiUrl, type, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Simple error handling
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    alert('Ce type existe déja'); // Alert the user
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Mettre à jour une unité existante
  updateType(id: number, type: Type): Observable<Type> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Type>(url, type);
  }

  // Supprimer une unité existante
  deleteTypeById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

TypeToUpdate: Type | null = null; // Stocke les données du Type à mettre à jour

openUpdateModal(TypeId: number) {
  this.selectedTypeIdSubject.next(TypeId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}
