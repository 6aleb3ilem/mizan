// item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';
import { BehaviorSubject } from 'rxjs';
import { ElementDevis } from './ElementDevis';
import { Element } from './element';
import { UnitesResponse } from './uniteresponse';
import { Unite } from './unite';
import { Status } from '../status/status';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private apiUrl = 'http://localhost:8082/api/elementdevis'; // Remplacez par l'URL de votre backend
  private listeDePrixsUrl = 'http://localhost:8082/api/ListeDePrixs';
  private elementsUrl = 'http://localhost:8082/api/elements'; // Add this line
  private tarifsUrl = 'http://localhost:8082/api/tarifs'; // Add this line
  private apiUrlstatus = 'http://localhost:8082/api/Status'; // URL de l'API REST pour les unités

  constructor(private HttpItem: HttpClient) {}
  selectedItemId: number | null = null;
  private selectedItemIdSubject = new BehaviorSubject<number | null>(null);
  selectedItemId$ = this.selectedItemIdSubject.asObservable();

getAllItems(): Observable<Item[]> {
  return this.HttpItem.get<Item[]>(this.apiUrl, { withCredentials: true });
}
 // Récupérer toutes les unités
 getAllStatuss(): Observable<Status[]> {
  return this.HttpItem.get<Status[]>(this.apiUrlstatus);
}
getAllElements(): Observable<Element[]> {
  const url='http://localhost:8082/api/elements'
  return this.HttpItem.get<Element[]>(url, { withCredentials: true });
}
getItemById(ItemId: number): Observable<Item> {
  const url = `${this.apiUrl}/${ItemId}`;
  return this.HttpItem.get<Item>(url, { withCredentials: true });
}
deleteItemById(ItemId: number): Observable<void> {
  const url = `${this.apiUrl}/${ItemId}`;
  return this.HttpItem.delete<void>(url, { withCredentials: true });
}
createItem(item: Item, taskId: number, elementId: number): Observable<Item> {
  const url = `${this.apiUrl}/assign-to-task?taskId=${taskId}&elementId=${elementId}`;
  return this.HttpItem.post<Item>(url, item);
}


getAlllisteDePrixs(): Observable<any[]> {
  return this.HttpItem.get<any[]>(this.listeDePrixsUrl);
}
getTaskDates(taskId: number): Observable<{ start: string, deadline: string }> {
  const url = `http://localhost:8082/api/tasks/${taskId}/dates`;
  return this.HttpItem.get<{ start: string, deadline: string }>(url, { withCredentials: true });
}

updateItem(id: number, updatedItem: Item): Observable<Item> {
  console.log(updatedItem); // Add this line for debugging
  const url = `${this.apiUrl}/${id}`;
  return this.HttpItem.put<Item>(url, updatedItem, { withCredentials: true });
}
deleteItemContact(ItemId: number, contactId: number): Observable<void> {
  const url = `${this.apiUrl}/${ItemId}/contacts/${contactId}`;
  return this.HttpItem.delete<void>(url, { withCredentials: true });
}
ItemToUpdate: Item | null = null; // Stocke les données du Item à mettre à jour

openUpdateModal(ItemId: number) {
  this.selectedItemIdSubject.next(ItemId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
getItemsByTaskId(taskId: number): Observable<Item[]> {
  const url = `${this.apiUrl}/task/${taskId}`;
  return this.HttpItem.get<Item[]>(url, { withCredentials: true });
}
getElementTypeById(elementId: number): Observable<any> { // Utilisez <Type> au lieu de any si vous avez un modèle
  return this.HttpItem.get<any>(`${this.elementsUrl}/${elementId}/type`, { withCredentials: true });
}
getUniteById(id: number): Observable<Unite> {
  const url = `http://localhost:8082/api/unites/${id}`;
  return this.HttpItem.get<Unite>(url);
}

// Dans item.service.ts
getUnitesByElementId(elementId: number): Observable<UnitesResponse> {
  const url = `${this.elementsUrl}/${elementId}/unites`; // Endpoint pour récupérer les unités par ID d'élément
  return this.HttpItem.get<UnitesResponse>(url, { withCredentials: true });
}

getPrixUnitaireByElementIdAndUniteNom(elementId: number, uniteNom: string): Observable<number> {
  return this.HttpItem.get<number>(`${this.tarifsUrl}/${elementId}/${encodeURIComponent(uniteNom)}`, { withCredentials: true });
}

}
