//client.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';
import { BehaviorSubject } from 'rxjs';
import { Contact } from './contact';
import { Status } from '../status/status';
import { Clientcontact } from '../client-contact/clientcontact';
import { Project } from '../projets/project';
@Injectable({
  providedIn: 'root',
})
export class ClientService {
  
  private apiUrl = 'http://localhost:8082/api/clients'; // Remplacez par l'URL de votre backend
  private apiUrlstatus = 'http://localhost:8082/api/Status'; // URL de l'API REST pour les unités
  private apiUrlclient = 'http://localhost:8082/api/contacts-clients';
  private apiUrlprojet = 'http://localhost:8082/api/Project';

  constructor(private httpClient: HttpClient) {}
  selectedClientId: number | null = null;
  private selectedClientIdSubject = new BehaviorSubject<number | null>(null);
  selectedClientId$ = this.selectedClientIdSubject.asObservable();
 // Récupérer toutes les unités
 getAllStatuss(): Observable<Status[]> {
  return this.httpClient.get<Status[]>(this.apiUrlstatus);
}
getAllProjects(): Observable<Project[]> {
  return this.httpClient.get<Project[]>(this.apiUrlprojet);
}

getAllClientContacts(): Observable<Clientcontact[]> {
  return this.httpClient.get<Clientcontact[]>(this.apiUrlclient);
}
  getClientContacts(clientId: number): Observable<Contact[]> {
    const url = `${this.apiUrl}/${clientId}/contacts`;
    return this.httpClient.get<Contact[]>(url);
  }
  getAllClients(): Observable<Client[]> {
  return this.httpClient.get<Client[]>(this.apiUrl, { withCredentials: true });
}
getClientById(clientId: number): Observable<Client> {
  const url = `${this.apiUrl}/${clientId}`;
  return this.httpClient.get<Client>(url, { withCredentials: true });
}
deleteClientById(clientId: number): Observable<void> {
  const url = `${this.apiUrl}/${clientId}`;
  return this.httpClient.delete<void>(url, { withCredentials: true });
}
createClient(newClient: Client): Observable<Client> {
  return this.httpClient.post<Client>(this.apiUrl, newClient, { withCredentials: true });
}
updateClient(id: number, updatedClient: Client): Observable<Client> {
  const url = `${this.apiUrl}/${id}`;
  return this.httpClient.put<Client>(url, updatedClient, { withCredentials: true });
}
deleteClientContact(clientId: number, contactId: number): Observable<void> {
  const url = `${this.apiUrl}/${clientId}/contacts/${contactId}`;
  return this.httpClient.delete<void>(url, { withCredentials: true });
}
clientToUpdate: Client | null = null; // Stocke les données du client à mettre à jour

openUpdateModal(clientId: number) {
  this.selectedClientIdSubject.next(clientId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
getStatusByLabelAndTableref(label: string, tableref: string = 'client'): Observable<Status> {
  return this.httpClient.get<Status>(`${this.apiUrlstatus}/label/${label}/tableref/client`);
}
}