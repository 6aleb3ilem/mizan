// src/app/services/clientContact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Clientcontact } from './clientcontact';
import { Contact } from '../contact/contact';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientContactService {
  private apiUrl = 'http://localhost:8082/api/contacts-clients';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  selectedClientContactId: number | null = null;
  private selectedClientContactIdSubject = new BehaviorSubject<number | null>(null);
  selectedClientContactId$ = this.selectedClientContactIdSubject.asObservable();
  constructor(private http: HttpClient) { }
  // Dans ContactService (si distinct de ClientContactService)

  getAllAvailableContacts(clientId: number): Observable<Contact[]> {
    const url = `${this.apiUrl}/available-contacts/${clientId}`;
    return this.http.get<Contact[]>(url);
  }
  getAllClientContacts(): Observable<Clientcontact[]> {
    return this.http.get<Clientcontact[]>(this.apiUrl);
  }
  // Dans src/app/services/ClientContact.service.ts
  getClientContactsByClientId(ClientId: number): Observable<Clientcontact[]> {
    const url = `${this.apiUrl}/client/${ClientId}`;
    return this.http.get<Clientcontact[]>(url);
  }
  getClientContactById(id: number): Observable<Clientcontact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Clientcontact>(url);
  }

  createClientContact(clientContact: Clientcontact): Observable<Clientcontact> {
    return this.http.post<Clientcontact>(this.apiUrl, clientContact, this.httpOptions);
  }
  ClientContactToUpdate: Clientcontact | null = null; // Stocke les données du ClientContact à mettre à jour
  updateClientContact(id: number, clientContact: Clientcontact): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, clientContact, this.httpOptions);
  }
  deleteClientContact(id: number): Observable<Clientcontact> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Clientcontact>(url);
  }
  openUpdateModal(ClientContactId: number) {
    this.selectedClientContactIdSubject.next(ClientContactId);
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'block';
    }
  }
  // Dans ClientContactService
  private clientContactDeletedSubject = new Subject<void>();
  clientContactDeleted$ = this.clientContactDeletedSubject.asObservable();

  notifyClientContactDeletion() {
    this.clientContactDeletedSubject.next();
  }
  checkPrincipalContactExistsForClient(clientId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/principal/exists/${clientId}`);
  }
}
