// src/app/services/devisf.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Devisf } from './devisf';
import { BehaviorSubject } from 'rxjs';
import { Status } from '../status/status';

@Injectable({
  providedIn: 'root'
})
export class DevisfService {
  private apiUrl = 'http://localhost:8082/api/devis';
  private apiUrlstatus = 'http://localhost:8082/api/Status'; // URL de l'API REST pour les unités
  private apiUrlDuplication = 'http://localhost:8082/api/duplications';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  selectedDevisfId: number | null = null;
  private selectedDevisfIdSubject = new BehaviorSubject<number | null>(null);
  selectedDevisfId$ = this.selectedDevisfIdSubject.asObservable();
  constructor(private http: HttpClient) { }
  // Dans ContactService (si distinct de DevisfService)
  getAllDevisfs(): Observable<Devisf[]> {
    return this.http.get<Devisf[]>(this.apiUrl);
  }
  hastache(devisId: number): Observable<boolean> {
    const url = `${this.apiUrl}/devis/${devisId}/hastache`;
    return this.http.get<boolean>(url, { withCredentials: true });
  }
  getAllStatuss(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrlstatus);
  }
  // Dans src/app/services/Devisf.service.ts
  getDevisfsByProjectId(ProjectId: number): Observable<Devisf[]> {
    const url = `${this.apiUrl}/project/${ProjectId}`;
    return this.http.get<Devisf[]>(url);
  }
  getDevisfById(id: number): Observable<Devisf> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Devisf>(url);
  }
  createDevisf(devis: Devisf, projectId: number): Observable<Devisf> {
    const params = new HttpParams().set('projectid', projectId.toString());
    return this.http.post<Devisf>(this.apiUrl, devis, { params });
  }

  DevisfToUpdate: Devisf | null = null; // Stocke les données du Devisf à mettre à jour
  updateDevisf(id: number, devisf: Devisf): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, devisf, this.httpOptions);
  }
  deleteDevisf(id: number): Observable<Devisf> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Devisf>(url);
  }
  openUpdateModal(DevisfId: number) {
    this.selectedDevisfIdSubject.next(DevisfId);
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'block';
    }
  }
  // Dans DevisfService
  private devisfDeletedSubject = new Subject<void>();
  devisfDeleted$ = this.devisfDeletedSubject.asObservable();

  notifyDevisfDeletion() {
    this.devisfDeletedSubject.next();
 
 
  }


  generateDevisReference(annee: string): Observable<string> {
    const url = `${this.apiUrl}/generate-reference/${annee}`;
    return this.http.get<string>(url, { responseType: 'text' as 'json' }); // Passer null comme corps de la requête car nous utilisons le chemin d'accès pour l'année
  }
  collerDevis(devisId: number | null, projectId: number | null): Observable<Devisf> {
    const url = `${this.apiUrl}/${devisId}/coller/${projectId}`;
    return this.http.post<Devisf>(url, null, this.httpOptions);
  }



  checkDuplication(d: number, p: number): Observable<boolean> {
    const url =` http://localhost:8082/check-duplication?d=${d}&p=${p}`;
    return this.http.get<boolean>(url);
  }
  addDuplication(devisId: number | null, projectId: number | null): Observable<any> {
    const url = `${this.apiUrlDuplication}?devisId=${devisId}&projectId=${projectId}`;
    return this.http.post<any>(url, null, this.httpOptions);
  }
}
