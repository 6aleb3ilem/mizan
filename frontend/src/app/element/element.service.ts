// Element.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Element } from './element';
import { BehaviorSubject } from 'rxjs';
import { Type } from '../type/type';
import { Tarif } from '../tarif/tarif';
import { catchError, map } from 'rxjs/operators'; // Importez map depuis 'rxjs/operators'
import { Item } from '../item/item';

@Injectable({
  providedIn: 'root'
})
export class ElementService {

  private apiUrl = 'http://localhost:8082/api/elements'; // URL de l'API REST pour les unités
  private apiUrlitem = 'http://localhost:8082/api/elementdevis'; // Remplacez par l'URL de votre backend
  private apiUrltarif = 'http://localhost:8082/api/tarifs';

  constructor(private http: HttpClient) { }
  selectedElementId: number | null = null;
  private selectedElementIdSubject = new BehaviorSubject<number | null>(null);
  selectedElementId$ = this.selectedElementIdSubject.asObservable();
  // Récupérer toutes les unités
  getAllElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.apiUrl);
  }
  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrlitem, { withCredentials: true });
  }
  // Méthode pour récupérer tous les types depuis le backend
  getAllTypes(): Observable<Type[]> {
    return this.http.get<Type[]>('http://localhost:8082/api/elements/types');
}
  // Récupérer une unité par son ID
  getElementById(id: number): Observable<Element> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Element>(url);
  }

  getAllTarifs(): Observable<Tarif[]> {
    return this.http.get<Tarif[]>(this.apiUrltarif);
  }
  // Dans la méthode createElement() de votre ElementService

  createElement(element: Element): Observable<Element> {
    console.log('Element to be sent:', element);
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    return this.http.post<Element>(this.apiUrl, element, httpOptions).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue lors de la création de l\'élément.';
        if (error.status === 409) {
          errorMessage = 'Un élément avec ce nom existe déjà.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  // Mettre à jour une unité existante
  updateElement(id: number, element: Element): Observable<Element> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Element>(url, element);
  }

  // Supprimer une unité existante
    deleteElementById(id: number): Observable<void> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.delete<void>(url);
    }

  ElementToUpdate: Element | null = null; // Stocke les données du Element à mettre à jour

openUpdateModal(ElementId: number) {
  this.selectedElementIdSubject.next(ElementId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}

}
