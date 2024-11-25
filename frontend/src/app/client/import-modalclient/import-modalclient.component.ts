import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ClientService } from '../client.service';
import { Client } from '../client'; // Import the Client model if not already imported
import { Status } from '../../status/status'; // Assurez-vous d'importer le modèle Status
import { ClientExcel } from './clients'; // Import the ClientExcel interface

@Component({
  selector: 'app-import-modalclient',
  templateUrl: './import-modalclient.component.html',
  styleUrls: ['./import-modalclient.component.css']
})
export class ImportModalclientComponent {
  file: File | null = null;

  constructor(private clientService: ClientService) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  importData(): void {
    if (!this.file) {
      console.error('No file selected!');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = async (e) => {
      const arrayBuffer: any = e.target!.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData: ClientExcel[] = XLSX.utils.sheet_to_json(worksheet, { raw: false }) as ClientExcel[];

      console.log('Parsed JSON data:', jsonData);

      for (const item of jsonData) {
        try {
          console.log('Processing client:', item);
          const status = await this.clientService.getStatusByLabelAndTableref(item.status).toPromise();
          console.log('Found status:', status);
          if (!status) {
            console.error(`Status not found: ${item.status}`);
            continue;
          }

          const client: Client = {
            id: item.id,
            name: item.name,
            telephone: item.telephone,
            email: item.email,
            address: item.address,
            status: status, // Utiliser l'objet Status
            note: item.note,
            contacts: [],
          };

          const response = await this.clientService.createClient(client).toPromise();
          console.log('Response from createClient:', response);
          console.log('Data imported successfully for client:', item.name);
        } catch (error) {
          console.error(`Error importing data for client: ${item.name}`, error);
        }
      }
      window.location.reload();
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  closeModalimp() {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}

