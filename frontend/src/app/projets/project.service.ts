import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './project';
import { BehaviorSubject } from 'rxjs';
import { Client } from '../client/client';
import { Situation } from '../situation/situation';
import { map } from 'rxjs/operators';
import { Devis } from './devis';
import { Tache } from './tache';
import { Clientcontact } from '../client-contact/clientcontact';
import { Status } from '../status/status';
import { BCT } from '../bct/bct';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {


  private apiUrl = 'http://localhost:8082/api/Project';
  private clientsUrl = 'http://localhost:8082/api/clients';
  private apiUrlSituations = 'http://localhost:8082/api/Situations'; // URL de l'API REST pour les unités
  private apiUrldevis = 'http://localhost:8082/api/devis';
  private apiUrltache = 'http://localhost:8082/api/tasks'; // Remplacez par l'URL de votre backend
  private apiUrlclient = 'http://localhost:8082/api/contacts-clients';
  private apiUrlstatus = 'http://localhost:8082/api/Status'; // URL de l'API REST pour les unités
  private apiUrlbct = 'http://localhost:8082/api/bcts/admin'; // URL de l'API REST pour les unités

  selectedProjectId: number | null = null;
  private selectedProjectIdSubject = new BehaviorSubject<number | null>(null);
  selectedProjectId$ = this.selectedProjectIdSubject.asObservable();
  constructor(private httpClient: HttpClient,private http: HttpClient) {}
  getAllSituations(): Observable<Situation[]> {
    return this.httpClient.get<Situation[]>(this.apiUrlSituations);
  }
    // Récupérer toutes les unités
    getAllBCTs(): Observable<BCT[]> {
      return this.httpClient.get<BCT[]>(this.apiUrlbct);
    }
  getAllStatuss(): Observable<Status[]> {
    return this.httpClient.get<Status[]>(this.apiUrlstatus);
  }
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(this.apiUrl);
  }
  getAllDevisfs(): Observable<Devis[]> {
    return this.http.get<Devis[]>(this.apiUrldevis);
  }
  getAllClientContacts(): Observable<Clientcontact[]> {
    return this.httpClient.get<Clientcontact[]>(this.apiUrlclient);
  }
  getAllTaches(): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(this.apiUrltache, { withCredentials: true });
  }
  getProjectById(projectId: number | null): Observable<Project> {
    const url = `${this.apiUrl}/${projectId}`;
    return this.httpClient.get<Project>(url);
  }
  updateProject(projectId: number, project: Project): Observable<Project> {
    const url = `${this.apiUrl}/${projectId}`;
    return this.httpClient.put<Project>(url, project);
  }
  
  deleteProjectById(projectId: number): Observable<void> {
    const url = `${this.apiUrl}/${projectId}`;
    return this.httpClient.delete<void>(url);
  }

  createProject(project: Project, clientId?: number): Observable<Project> {
    // Use optional chaining to get the client ID from the project, or use the explicitly provided clientId.
    // This ensures clientId is always set based on the provided argument or falls back to project's client ID.
    const effectiveClientId = clientId || project.client?.id;

    // Construct the payload with the effectiveClientId without modifying the original project object.
    // If you need to exclude the client object from the payload, consider creating a copy of the project without the client property.
    const payload = { ...project, clientId: effectiveClientId };


    return this.httpClient.post<Project>(this.apiUrl, payload);
}

  getAllClients(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.clientsUrl);
  }


  ProjectToUpdate: Project | null = null; // Stocke les données du Project à mettre à jour

openUpdateModal(ProjectId: number) {
  this.selectedProjectIdSubject.next(ProjectId);
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'block';
  }
}
create_devis(project: any) {
  // Envoyer la requête POST au backend pour créer un devis pour le projet donné
  const url = `http://localhost:8082/api/devis/creer_devis`;

  this.http.post(url, project).subscribe(
    () => {
      // Gérer la réponse vide du backend si nécessaire
      console.log('Devis créé avec succès.');
    },
    error => {
      console.error('Erreur lors de la création du devis:', error);
    }
  );
}

// generateProjectReference(project: Project): Observable<String> {
//   const url = `${this.apiUrl}/generate-reference`;
//   return this.httpClient.post<String>(url, project, { withCredentials: true });
// }
generateProjectReference(annee: string): Observable<string> {
  const url = `${this.apiUrl}/generate-reference/${annee}`;
  return this.httpClient.get<string>(url, { responseType: 'text' as 'json' }); // Passer null comme corps de la requête car nous utilisons le chemin d'accès pour l'année
}

getProjectsByContactId(contactId: number): Observable<Project[]> {
  const url = `${this.apiUrl}/contacts/${contactId}/projects`;
  return this.httpClient.get<Project[]>(url);
}

getProjectsByClientId(clientId: number): Observable<Project[]> {
  const url = `${this.apiUrl}/clients/${clientId}/projects`;
  return this.httpClient.get<Project[]>(url);
}

getProjects(contactId: number | null, clientId: number | null): Observable<Project[]> {
  let params = new HttpParams();
  if (contactId) {
    params = params.append('contactId', contactId.toString());
  }
  if (clientId) {
    params = params.append('clientId', clientId.toString());
  }
  return this.http.get<Project[]>('/api/Project/projects', { params });
}



duplicateProject(originalProjectId: number | null): Observable<Project> {
  return this.getProjectById(originalProjectId).pipe(
    map(project => {
      const newProject = { ...project};
      // Assurez-vous de retirer ou de régénérer toutes les propriétés qui doivent être uniques pour le nouveau projet
      return newProject;
    })
  );
}
}
