// Profession.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs'; // Import throwError here
import { Profession } from './profession';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../contact/contact';


@Injectable({
  providedIn: 'root'
})
export class ProfessionService {

  private apiUrl = 'http://localhost:8082/api/Professions'; // URL de l'API REST pour les unités
  private apiUrlcontact = 'http://localhost:8082/api/contacts'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }
  selectedProfessionId: number | null = null;
  private selectedProfessionIdSubject = new BehaviorSubject<number | null>(null);
  selectedProfessionId$ = this.selectedProfessionIdSubject.asObservable();

  // Récupérer toutes les unités
  getAllProfessions(): Observable<Profession[]> {
    return this.http.get<Profession[]>(this.apiUrl);
  }
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrlcontact, { withCredentials: true });}
  // }
  // Récupérer une unité par son ID
  getProfessionById(id: number): Observable<Profession> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Profession>(url);
  }

  // Créer une nouvelle unité
  createProfession(profession: Profession): Observable<Profession> {
    return this.http.post<Profession>(this.apiUrl, profession, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Simple error handling
    console.error(`Backend returned code ${error.status}, body was: `, error.error);
    alert('Ce profession existe déja'); // Alert the user
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Mettre à jour une unité existante
  updateProfession(id: number, profession: Profession): Observable<Profession> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Profession>(url, profession);
  }

  // Supprimer une unité existante
  deleteProfessionById({ id }: { id: number; }): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

ProfessionToUpdate: Profession | null = null; // Stocke les données du Profession à mettre à jour

openUpdateModal(ProfessionId: number) {
  this.selectedProfessionIdSubject.next(ProfessionId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
}
