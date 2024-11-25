import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Client } from '../../client/client';
@Component({
  selector: 'app-import-modalprojet',
  templateUrl: './import-modalprojet.component.html',
  styleUrls: ['./import-modalprojet.component.css']
})
export class ImportModalprojetComponent {
  file: File | null = null;

  constructor(private projectService: ProjectService) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  importData(): void {
    if (!this.file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      json.forEach((proj: any) => {
        const excelDate = proj.creationDate;
        const jsDate = new Date((excelDate - (25567 + 1)) * 86400 * 1000);
        const formattedDate = jsDate.toISOString().split('T')[0]; // 'yyyy-MM-dd'
        const client: Client = {
          id: proj.clientId,
          name: proj.client, // Assuming the 'client' column has the client name
          telephone:proj.telephone,
          email:proj.email,
          address:proj.address,
          status:proj.status,
          note:proj.note,
          contacts:proj.contacts
        };
        const project: Project = {
          // Assign each property from the JSON to the corresponding property in the Project model
          projectId: proj.projectId, // This should be null or undefined as it will be set by the backend
          creationDate: formattedDate,
          projectMO: proj.projectMO,
          projectMOE: proj.projectMOE,
          projectBCT: proj.projectBCT,
          status:proj.status, situation:proj.situation,
          projectLocation: proj.projectLocation,
          title: proj.title,
          refProjet: proj.refProjet,
          annee: proj.annee,
          client: client, // You might need to handle client assignment differently based on your data structure
          clientId: proj.clientId
        };
        this.projectService.createProject(project).subscribe({
          next: (response) => {
            console.log('Project imported:', response);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error importing project:', error);
          }
        });
      });
    };
    reader.readAsBinaryString(this.file);
  }

  closeModalimp() {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}
