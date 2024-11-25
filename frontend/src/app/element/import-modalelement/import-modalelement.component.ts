import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { ElementService } from '../element.service';
import { Element } from '../element'; // Import the Element model if not already imported
import { Unite } from 'src/app/unite/unite';
@Component({
  selector: 'app-import-modalelement',
  templateUrl: './import-modalelement.component.html',
  styleUrls: ['./import-modalelement.component.css']
})
export class ImportModalelementComponent {
  file: File | null = null;

  constructor(private elementService: ElementService) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  importData(): void {
    if (!this.file) {
      console.error('No file selected!');
      return;
    }
  
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const arrayBuffer: any = e.target!.result;
      const data = new Uint8Array(arrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
  
      jsonData.forEach((item: any) => {
        const element: Element = {
          id: item.id,
          name: item.name,
          note: item.note,
          type: item.type ? { id_type: item.type, label: '' } : null // Fournir un label par défaut ou dynamique
        };
      
        this.elementService.createElement(element).subscribe(() => {
          console.log('Data imported successfully');
          window.location.reload();

          // You can add further logic here if needed
        });
      });
      
      
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
