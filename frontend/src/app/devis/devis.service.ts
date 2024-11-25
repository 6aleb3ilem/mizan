import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Devis } from './devis';
import { Item } from '../item/item';
import { ElementDevis } from '../item/ElementDevis';
import { Tache } from '../tache/tache';
import { Type } from '../item/type';
import { ProjectClientDTO } from './projectclientdto';
@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private apiUrl = 'http://localhost:8082/api/devis'; // Remplacez par l'URL de votre backend
  private tasksUrl = 'http://localhost:8082/api/tasks'; // URL de base pour les endpoints des tâches
  private typesUrl = 'http://localhost:8082/api/types'; // URL de base pour les types
  private elementDevisUrl = 'http://localhost:8082/api/elementdevis'; // URL de base pour les endpoints ElementDevis
  private elementDevisCountUrl = 'http://localhost:8082/api/elementDevis/countByType'; // Assurez-vous que cela correspond à l'URL de votre endpoint
  private devisUrl = 'http://localhost:8082/api/devis';
  constructor(private httpClient: HttpClient) { }

  getProjectAndClientNames(devisId: number): Observable<ProjectClientDTO> {
    const params = new HttpParams()
      .set('devisId', devisId.toString())

    return this.httpClient.get<ProjectClientDTO>(`${this.apiUrl}/details`, { params });
  }

  updateDevis(id: number, devis: Partial<Devis>): Observable<Devis> {
    const url = `${this.apiUrl}/updateAmounts/${id}`;
    console.log('Updating devis with: ', devis);
    return this.httpClient.put<Devis>(url, devis, { withCredentials: true });
}

  getAllDevis(): Observable<Devis[]> {
    return this.httpClient.get<Devis[]>(this.apiUrl, { withCredentials: true });
  }
  
  getDevisById(id: number): Observable<Devis> {
    return this.httpClient.get<Devis>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }  

  getTaskNamesByProjectName(projectName: string): Observable<string[]> {
    const url = `http://localhost:8082/api/lignes-devis/taskNames/${projectName}`;
    return this.httpClient.get<string[]>(url, { withCredentials: true });
  }
  // getTaskNamesByProjectName(projectName: string): Observable<Tache[]> {
  //   const url = `http://localhost:8082/api/tasks/taskNames/project/{projectId}`;
  //   return this.httpClient.get<Tache[]>(url, { withCredentials: true });
  // }

  getElementsDevisByTaskName(taskName: string): Observable<Item[]> {
    const url='http://localhost:8082/api/tasks';
    return this.httpClient.get<Item[]>(`${url}/${taskName}/elementsdevis`);
  }

  getTasksByProjectId(projectId: number): Observable<Tache[]> {
    return this.httpClient.get<Tache[]>(`${this.tasksUrl}/${projectId}`, { withCredentials: true });
  }
  getAllTypes(): Observable<Type[]> {
    return this.httpClient.get<Type[]>(this.typesUrl, { withCredentials: true });
  }
  getElementDevisByTaskNameAndOptionalType(taskName: string, typeId?: number): Observable<Item[]> {
    let params = new HttpParams();
    if (typeId) {
      params = params.append('typeId', typeId.toString());
    }
    return this.httpClient.get<Item[]>(`${this.elementDevisUrl}/Edevis/${taskName}`, { params: params });
  }

  countElementDevisByType(typeLabel: string): Observable<number> {
    const url = `${this.elementDevisCountUrl}/${typeLabel}`;
    return this.httpClient.get<number>(url, { withCredentials: true });
  }
  getDevisDetailsByType(typeLabel: string): Observable<Item[]> {
    return this.httpClient.get<Item[]>(`${this.elementDevisUrl}/detailsByType/${typeLabel}`);
  }

  downloadDevisReport(devisId: number): Observable<Blob> {
    const url = `${this.apiUrl}/downloadDevis/${devisId}`;
    return this.httpClient.get(url, { responseType: 'blob' });
  }  
  exportDevisToPDF() {
    const element = document.getElementById('devis-content');
    if (element) {
        const content = element.innerHTML;
        this.httpClient.post('http://localhost:8080/api/pdf/generate', { htmlContent: content }, { responseType: 'blob' })
          .subscribe((res: Blob) => {
            const file = new Blob([res], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          });
    } else {
        console.error('Failed to find the element with ID "devis-content".');
        // Handle the error appropriately
        // Perhaps show user feedback or log this error
    }
}
getElementDevisByTaskId(taskId: number): Observable<Item[]> {
  const url = `${this.tasksUrl}/${taskId}/elementsdevis`;
  return this.httpClient.get<Item[]>(url);
}
updateDevisMontant(devisId: number, taskAmount: number): Observable<void> {
  const url = `${this.devisUrl}/${devisId}/update-montant`;
  return this.httpClient.put<void>(url, taskAmount);
}
getTaskAmount(taskId: number): Observable<number> {
  return this.httpClient.get<number>(`${this.tasksUrl}/${taskId}/amount`);
}
updateDevisMontant1(devisId: number, taskAmount: number): Observable<void> {
  const url = `${this.devisUrl}/${devisId}/update-montant1`;
  return this.httpClient.put<void>(url, taskAmount);
}
}
