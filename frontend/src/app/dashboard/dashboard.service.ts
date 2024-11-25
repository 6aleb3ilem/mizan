// tache.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private TaskStatusDistribution = 'http://localhost:8082/api/tasks/status-distribution'; // Remplacez par votre URL API
    private ProjectStatusDistribution = 'http://localhost:8082/api/Project/status-distribution'; // Remplacez par votre URL API
    private DevisStatusDistribution = 'http://localhost:8082/api/devis/status-distribution'; // Remplacez par votre URL API
    private ElementdevisStatusDistribution = 'http://localhost:8082/api/elementdevis/status-distribution'; // Remplacez par votre URL API

    constructor(private HttpTache: HttpClient) {}
    getTaskStatusDistribution(): Observable<{ [key: string]: number }> {
        return this.HttpTache.get<{ [key: string]: number }>(this.TaskStatusDistribution);
      }
      
      getProjectStatusDistribution(): Observable<{ [key: string]: number }> {
        return this.HttpTache.get<{ [key: string]: number }>(this.ProjectStatusDistribution);
      }
      getDevisStatusDistribution(): Observable<{ [key: string]: number }> {
        return this.HttpTache.get<{ [key: string]: number }>(this.DevisStatusDistribution);
      }
      getElementdevisStatusDistribution(): Observable<{ [key: string]: number }> {
        return this.HttpTache.get<{ [key: string]: number }>(this.ElementdevisStatusDistribution);
      }
}