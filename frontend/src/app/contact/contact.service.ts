import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact';
import { BehaviorSubject } from 'rxjs';
import { Profession } from '../profession/profession';
import { Clientcontact } from '../client-contact/clientcontact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

   
  private apiUrl = 'http://localhost:8082/api/contacts'; // Remplacez par l'URL de votre backend
  private apiprofession = 'http://localhost:8082/api/Professions'; // URL de l'API REST pour les unités
  private apiUrlclient = 'http://localhost:8082/api/contacts-clients';

  constructor(private httpClient: HttpClient) {}
  selectedcontactId: number | null = null;
  private selectedcontactIdSubject = new BehaviorSubject<number | null>(null);
  selectedcontactId$ = this.selectedcontactIdSubject.asObservable();
 // Récupérer toutes les unités
 getAllProfessions(): Observable<Profession[]> {
  return this.httpClient.get<Profession[]>(this.apiprofession);
}
getAllClientContacts(): Observable<Clientcontact[]> {
  return this.httpClient.get<Clientcontact[]>(this.apiUrlclient);
}
  // Contact.service.ts
getAllContacts(): Observable<Contact[]> {
  return this.httpClient.get<Contact[]>(this.apiUrl, { withCredentials: true });}
// }
getContactById(contactId: number): Observable<Contact> {
  const url = `${this.apiUrl}/${contactId}`;
  return this.httpClient.get<Contact>(url, { withCredentials: true });
}
// deleteContactById(contactId: number): Observable<void> {
//   const url = `${this.apiUrl}/${contactId}`;
//   return this.httpContact.delete<void>(url, { withCredentials: true });
// }
createContact(newContact: Contact): Observable<Contact> {
  return this.httpClient.post<Contact>(this.apiUrl, newContact, { withCredentials: true });
  }
  updateContact(id: number, updatedContact: Contact): Observable<Contact> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<Contact>(url, updatedContact, { withCredentials: true });
  }
  // deleteContactContact(contactId: number, contactId: number): Observable<void> {
  //  const url = `${this.apiUrl}/${contactId}/contacts/${contactId}`;
  //  return this.httpContact.delete<void>(url, { withCredentials: true });
  // }
contactToUpdate: Contact | null = null; // Stocke les données du Contact à mettre à jour
deleteContactById(ContactId: number): Observable<void> {
  const url = `${this.apiUrl}/${ContactId}`;
  return this.httpClient.delete<void>(url, { withCredentials: true });
}
openUpdateModal(contactId: number) {
  this.selectedcontactIdSubject.next(contactId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
getClientContacts(clientId: number): Observable<Contact[]> {
  const url = `${this.apiUrl}/${clientId}/contacts`;
  return this.httpClient.get<Contact[]>(url);
}
getProfessionByName(name: string): Observable<Profession> {
  return this.httpClient.get<Profession>(`${this.apiprofession}/name/${name}`);
}
}
