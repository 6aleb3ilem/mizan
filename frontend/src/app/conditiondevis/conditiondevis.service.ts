// src/app/services/conditionDevis.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Conditiondevis } from './conditiondevis';
import { conditionP } from '../condition-p/conditionP';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConditiondevisService {
  private apiUrl = 'http://localhost:8082/api/condition-devis';
  private apiUrlc = 'http://localhost:8082/conditions'; // URL de l'API REST pour les unités

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  selectedConditiondevisId: number | null = null;
  private selectedConditiondevisIdSubject = new BehaviorSubject<number | null>(null);
  selectedConditiondevisId$ = this.selectedConditiondevisIdSubject.asObservable();
  constructor(private http: HttpClient) { }
  // Dans conditionPService (si distinct de ConditiondevisService)
  getAllconditionPs(): Observable<conditionP[]> {
    return this.http.get<conditionP[]>(this.apiUrlc);
  }
  getAllAvailableconditionPs(devisId: number): Observable<conditionP[]> {
    const url = `${this.apiUrl}/available-conditionPs/${devisId}`;
    return this.http.get<conditionP[]>(url);
  }
  getAllConditiondeviss(): Observable<Conditiondevis[]> {
    return this.http.get<Conditiondevis[]>(this.apiUrl);
  }
  // Dans src/app/services/Conditiondevis.service.ts
  getConditiondevissByDevisId(DevisId: number): Observable<Conditiondevis[]> {
    const url = `${this.apiUrl}/devis/${DevisId}`;
    return this.http.get<Conditiondevis[]>(url);
  }
  getConditiondevisById(id: number): Observable<Conditiondevis> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Conditiondevis>(url);
  }

  createConditiondevis(conditionDevis: Conditiondevis): Observable<Conditiondevis> {
    return this.http.post<Conditiondevis>(this.apiUrl, conditionDevis, this.httpOptions);
  }
  ConditiondevisToUpdate: Conditiondevis | null = null; // Stocke les données du Conditiondevis à mettre à jour
  updateConditiondevis(id: number, conditionDevis: Conditiondevis): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, conditionDevis, this.httpOptions);
  }
  deleteConditiondevis(id: number): Observable<Conditiondevis> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Conditiondevis>(url);
  }
  openUpdateModal(ConditiondevisId: number) {
    this.selectedConditiondevisIdSubject.next(ConditiondevisId);
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'block';
    }
  }
  // Dans ConditiondevisService
  private conditionDevisDeletedSubject = new Subject<void>();
  conditionDevisDeleted$ = this.conditionDevisDeletedSubject.asObservable();

  notifyConditiondevisDeletion() {
    this.conditionDevisDeletedSubject.next();
  }
  checkPrincipalconditionPExistsForDevis(devisId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/principal/exists/${devisId}`);
  }
}
