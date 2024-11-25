import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Profession } from '../../profession/profession';
import { ContactExcel } from './contact';

@Component({
  selector: 'app-import-modalcontact',
  templateUrl: './import-modalcontact.component.html',
  styleUrls: ['./import-modalcontact.component.css']
})
export class ImportModalcontactComponent {
  file: File | null = null;

  constructor(private contactService: ContactService) {}

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
      const jsonData: ContactExcel[] = XLSX.utils.sheet_to_json(worksheet, { raw: false }) as ContactExcel[];

      console.log('Parsed JSON data:', jsonData);

      for (const item of jsonData) {
        try {
          console.log('Processing contact:', item);
          const profession = await this.contactService.getProfessionByName(item.profession).toPromise();
          console.log('Found profession:', profession);
          if (!profession) {
            console.error(`Profession not found: ${item.profession}`);
            continue;
          }

          const contact: Contact = {
            id: item.id,
            name: item.name,
            telephone: item.telephone,
            email: item.email,
            address: item.address,
            whatsapp: item.whatsapp,
            note: item.note,
            profession: profession, // Utiliser l'objet Profession
            clients: [],
          };

          const response = await this.contactService.createContact(contact).toPromise();
          console.log('Response from createContact:', response);
          console.log('Data imported successfully for contact:', item.name);
        } catch (error) {
          console.error(`Error importing data for contact: ${item.name}`, error);
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
