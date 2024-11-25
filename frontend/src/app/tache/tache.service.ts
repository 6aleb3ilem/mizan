// tache.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from './tache';
import { BehaviorSubject } from 'rxjs';
import { Projet } from './projet';
import { Priorite } from '../priorite/priorite';
import { Status } from '../status/status';
import { tacheref } from '../tacheref/tacheref';
import { Item } from '../item/item';
@Injectable({
  providedIn: 'root'
})
export class TacheService {

  
  private apiUrl = 'http://localhost:8082/api/tasks'; // Remplacez par l'URL de votre backend
  private apiUrlpriorite = 'http://localhost:8082/api/priorites'; // URL de l'API REST pour les unités
  private apiUrlstatus = 'http://localhost:8082/api/Status'; // URL de l'API REST pour les unités
  private apiUrltache = 'http://localhost:8082/api/taches'; // URL de l'API REST pour les unités
  private apiUrlitem = 'http://localhost:8082/api/elementdevis'; // Remplacez par l'URL de votre backend

  constructor(private HttpTache: HttpClient) {}
  selectedTacheId: number | null = null;
  private selectedTacheIdSubject = new BehaviorSubject<number | null>(null);
  selectedTacheId$ = this.selectedTacheIdSubject.asObservable();
 // Récupérer toutes les unités

 getAlltacherefs(): Observable<tacheref[]> {
  return this.HttpTache.get<tacheref[]>(this.apiUrltache);
}
hasElementDevis(taskId: number): Observable<boolean> {
  const url = `${this.apiUrl}/task/${taskId}/hasElementDevis`;
  return this.HttpTache.get<boolean>(url, { withCredentials: true });
}
getAllItems(): Observable<Item[]> {
  return this.HttpTache.get<Item[]>(this.apiUrlitem, { withCredentials: true });
}
 // Récupérer toutes les unités
 getAllPriorites(): Observable<Priorite[]> {
  return this.HttpTache.get<Priorite[]>(this.apiUrlpriorite);
}
 // Récupérer toutes les unités
 getAllStatuss(): Observable<Status[]> {
  return this.HttpTache.get<Status[]>(this.apiUrlstatus);
}
getAllTaches(): Observable<Tache[]> {
  return this.HttpTache.get<Tache[]>(this.apiUrl, { withCredentials: true });
}
getTacheById(TacheId: number): Observable<Tache> {
  const url = `${this.apiUrl}/${TacheId}`;
  return this.HttpTache.get<Tache>(url, { withCredentials: true });
}
deleteTacheById(TacheId: number): Observable<void> {
  const url = `${this.apiUrl}/${TacheId}`;
  return this.HttpTache.delete<void>(url, { withCredentials: true });
}
createTache(newTache: Tache, projectid: number): Observable<Tache> {
  const url = `${this.apiUrl}/add?projectid=${projectid}`;
  console.log(newTache);
  return this.HttpTache.post<Tache>(url, newTache, { withCredentials: true });
}


updateTache(id: number, updatedTache: Tache): Observable<Tache> {
  const url = `${this.apiUrl}/${id}`;
  return this.HttpTache.put<Tache>(url, updatedTache, { withCredentials: true });
}
deleteTacheContact(TacheId: number, contactId: number): Observable<void> {
  const url = `${this.apiUrl}/${TacheId}/contacts/${contactId}`;
  return this.HttpTache.delete<void>(url, { withCredentials: true });
}
TacheToUpdate: Tache | null = null; // Stocke les données du Tache à mettre à jour

openUpdateModal(TacheId: number) {
  this.selectedTacheIdSubject.next(TacheId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
getTachesByProjectId(projectId: number): Observable<Tache[]> {
  const url = `${this.apiUrl}/project/${projectId}`;
  return this.HttpTache.get<Tache[]>(url, { withCredentials: true });
}
getProjectById(projectId: number): Observable<Projet> {
  const url = `http://localhost:8082/api/Project/${projectId}`;

  return this.HttpTache.get<Projet>(url, { withCredentials: true });


}
}
