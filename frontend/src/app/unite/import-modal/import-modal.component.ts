// import-modal.component.ts
import { Component } from '@angular/core';
import * as XLSX from 'xlsx';
import { UniteService } from '../unite.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Unite } from '../unite';

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
    private uniteService: UniteService  // Injectez le service
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
    const jsonData: Unite[] = XLSX.utils.sheet_to_json(worksheet, {raw: true}) as Unite[];

    jsonData.forEach((uniteData: Unite) => {
      this.uniteService.createUnite(uniteData).subscribe({
       
        next: (response) => console.log("Unite ajoutée avec succès", response),
        error: (error) => console.error("Erreur lors de l'ajout de l'unite", error)
      });
      console.log(uniteData)
    });

    this.dialogRef.close(); // Ferme la boîte de dialogue après l'importation
  }
  fileReader.readAsArrayBuffer(this.file);
}



onClose(): void {
  this.dialogRef.close();
}

}
