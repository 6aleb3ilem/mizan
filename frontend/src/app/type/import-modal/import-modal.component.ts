import { Component } from '@angular/core';
import { Type } from '../type';
import { MatDialogRef } from '@angular/material/dialog';
import { TypeService } from '../type.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-import-modal',
  templateUrl: './import-modal.component.html',
  styleUrls: ['./import-modal.component.css']
})
export class ImportModalComponent {
  file!: File;
  arrayBuffer: any;
  constructor(
    public dialogRef: MatDialogRef<ImportModalComponent>,
    private typeService: TypeService  // Injectez le service
  ) {}
onFileChange(event: any) {
  this.file = event.target.files[0];
}

onImport(): void {
  if (!this.file) {
    console.error('Aucun fichier sélectionné');
    return;
  }

  let fileReader = new FileReader();
  fileReader.onload = (e) => {
    this.arrayBuffer = fileReader.result;
    var data = new Uint8Array(this.arrayBuffer);
    var arr = new Array();
    for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
    var bstr = arr.join("");
    var workbook = XLSX.read(bstr, {type: "binary"});
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    const jsonData: Type[] = XLSX.utils.sheet_to_json(worksheet, {raw: true}) as Type[];

    jsonData.forEach((typeData: Type) => {
      this.typeService.createType(typeData).subscribe({
        next: (response) => console.log("Type ajoutée avec succès", response),
        error: (error) => console.error("Erreur lors de l'ajout de l'type", error)
      });
    });

    this.dialogRef.close(); // Ferme la boîte de dialogue après l'importation
  }

  fileReader.readAsArrayBuffer(this.file);
}



onClose(): void {
  this.dialogRef.close();
}

}
