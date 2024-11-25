import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeviProjectClientrefDTO } from './deviprojectclientrefdto';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:8082/api/devis'; // Assurez-vous de changer l'URL en fonction de votre backend

  constructor(private http: HttpClient) { }

  generateDevisReport(devisId: number): void {
    this.getDevisDetails(devisId).subscribe(details => {
      const url = `${this.baseUrl}/reports/${devisId}`;
      this.http.get(url, { responseType: 'arraybuffer' }).subscribe(
        (response: ArrayBuffer) => {
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);

          // Crée un lien temporaire dans le DOM
          const a = document.createElement('a');
          a.href = fileURL;
          a.download = `${details.refDevis}_${details.projectTitle}_${details.clientName}.pdf`; // Utilise les détails pour nommer le fichier
          document.body.appendChild(a);
          a.click();
          
          // Nettoie le DOM
          document.body.removeChild(a);
          URL.revokeObjectURL(fileURL); // Libère l'URL créée
        },
        error => {
          console.error('Error generating report:', error);
        }
      );
    });
  }

  getDevisDetails(devisId: number): Observable<DeviProjectClientrefDTO> {
    const params = new HttpParams().set('devisId', devisId.toString());
    return this.http.get<DeviProjectClientrefDTO>(`${this.baseUrl}/detailsss`, { params });
  }
}
