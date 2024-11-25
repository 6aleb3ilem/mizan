import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../contact/contact';
import { Client } from '../tache/client';
@Injectable({
  providedIn: 'root'
})
export class ContactProjetService {

  private baseUrl = 'http://localhost:8082/api/contacts'; // Mise à jour de l'URL de base

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer les contacts par ID de projet
  getContactsByProjectId(projectId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/byProject/${projectId}`);
  }
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl, { withCredentials: true });}

    getClientByProjectId(projectId: number): Observable<Client> {
      const url="http://localhost:8082/api/Project";
      return this.http.get<Client>(`${url}/${projectId}/client`);
    }
    getContactsNotLinkedToProject(projectId: number): Observable<Contact[]> {
      return this.http.get<Contact[]>(`${this.baseUrl}/notLinked/${projectId}`);
    }
    addOrUpdateContactProjectRelation(contactId: number, clientId: number, projectId: number): Observable<any> {
      const params = new HttpParams()
        .set('contactId', contactId.toString())
        .set('clientId', clientId.toString())
        .set('projectId', projectId.toString());
        const url="http://localhost:8082/api/contacts-clients";

      return this.http.put(`${url}/contactProjectRelation`, {}, { params });
    }
}
