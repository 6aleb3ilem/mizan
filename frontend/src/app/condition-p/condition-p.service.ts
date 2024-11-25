// conditionP.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { conditionP } from './conditionP';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../contact/contact';


@Injectable({
  providedIn: 'root'
})
export class conditionPService {

  private apiUrl = 'http://localhost:8082/conditions'; // URL de l'API REST pour les unités
  private apiUrlcontact = 'http://localhost:8082/api/contacts'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }
  selectedconditionPId: number | null = null;
  private selectedconditionPIdSubject = new BehaviorSubject<number | null>(null);
  selectedconditionPId$ = this.selectedconditionPIdSubject.asObservable();

  // Récupérer toutes les unités
  getAllconditionPs(): Observable<conditionP[]> {
    return this.http.get<conditionP[]>(this.apiUrl);
  }
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrlcontact, { withCredentials: true });}
  // }
  // Récupérer une unité par son ID
  getconditionPById(id: number): Observable<conditionP> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<conditionP>(url);
  }

  // Créer une nouvelle unité
  createconditionP(profession: conditionP): Observable<conditionP> {
    return this.http.post<conditionP>(this.apiUrl, profession, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Simple error handling
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    alert('Ce profession existe déja'); // Alert the user
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Mettre à jour une unité existante
  updateconditionP(id: number, profession: conditionP): Observable<conditionP> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<conditionP>(url, profession);
  }

  // Supprimer une unité existante
  deleteconditionPById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

conditionPToUpdate: conditionP | null = null; // Stocke les données du conditionP à mettre à jour

openUpdateModal(conditionPId: number) {
  this.selectedconditionPIdSubject.next(conditionPId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}
