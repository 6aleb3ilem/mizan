import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { TarifService } from '../tarif.service';
import { Tarif } from '../tarif'; // Import the Tarif model if not already imported
import { Unite } from 'src/app/unite/unite';
import { Element } from 'src/app/element/element';
import { Type } from 'src/app/type/type'; // Import the Type interface

@Component({
  selector: 'app-import-modaltarif',
  templateUrl: './import-modaltarif.component.html',
  styleUrls: ['./import-modaltarif.component.css']
})
export class ImportModaltarifComponent {
  file: File | null = null;

  constructor(private tarifService: TarifService) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  importData(): void {
    if (this.file) {
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

        // Iterate over jsonData and create Tarif objects
        jsonData.forEach((item: any) => {
          const element: Element = { id: item.elementId, name: item.element, note: '', type: { id_type: 1, label: 'default' } }; // Adjust 'type' as needed
          const unite: Unite = { id: item.uniteId, unite: item.unite };
          const tarif: Tarif = {
            id: item.id,
            unite: unite,
            element: element,
            pritunit: item.pritunit,
            principal: item.principal === 'VRAI'
          };

          // Example: Insert data using TarifService
          this.tarifService.createTarif(tarif).subscribe(() => {
            console.log('Data imported successfully');
            window.location.reload();

            // You can add further logic here if needed
          });
        });
      };
      fileReader.readAsArrayBuffer(this.file);
    }
  }
  closeModalimp() {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}
