// src/app/services/tarif.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Tarif } from './tarif';
import { Unite } from '../unite/unite';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TarifService {
  private apiUrl = 'http://localhost:8082/api/tarifs';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  selectedTarifId: number | null = null;
  private selectedTarifIdSubject = new BehaviorSubject<number | null>(null);
  selectedTarifId$ = this.selectedTarifIdSubject.asObservable();


  constructor(private http: HttpClient) { }
  // Dans UniteService (si distinct de TarifService)
  getUnitesNotLinkedToElement(elementId: number): Observable<Unite[]> {
    const url = `${this.apiUrl}/unites-not-linked/${elementId}`;
    return this.http.get<Unite[]>(url);
  }

  getAllTarifs(): Observable<Tarif[]> {
    return this.http.get<Tarif[]>(this.apiUrl);
  }
// Dans src/app/services/tarif.service.ts

getTarifsByElementId(elementId: number): Observable<Tarif[]> {
  const url = `${this.apiUrl}/byElement/${elementId}`;
  return this.http.get<Tarif[]>(url);
}

  getTarifById(id: number): Observable<Tarif> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Tarif>(url);
  }

  createTarif(tarif: Tarif): Observable<Tarif> {
    return this.http.post<Tarif>(this.apiUrl, tarif, this.httpOptions);
  }
  TarifToUpdate: Tarif | null = null; // Stocke les données du Tarif à mettre à jour


  updateTarif(id: number, tarif: Tarif): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, tarif, this.httpOptions);
  }

  deleteTarif(id: number): Observable<Tarif> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Tarif>(url);
  }
  openUpdateModal(TarifId: number) {
    this.selectedTarifIdSubject.next(TarifId);
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'block';
    }
  }
  // Dans TarifService
private tarifDeletedSubject = new Subject<void>();
tarifDeleted$ = this.tarifDeletedSubject.asObservable();

notifyTarifDeletion() {
  this.tarifDeletedSubject.next();
}
checkPrincipalTarifExistsForElement(elementId: number): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/principal/exists/${elementId}`);
}

}
