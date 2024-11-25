import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { TacheService } from '../tache.service';
import { Tache } from '../tache'; // Import the Tache model if not already imported
import { Unite } from 'src/app/unite/unite';
@Component({
  selector: 'app-import-modaltache',
  templateUrl: './import-modaltache.component.html',
  styleUrl: './import-modaltache.component.css'
})
export class ImportModaltacheComponent {
  file: File | null = null;
  @Input() projectId!: number;


  constructor(private tacheService: TacheService) {}

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
        const tache: Tache = {
          taskId: item.taskId,
          taskName: item.taskName,
          refTask:item.refTask,
          start:item.start,
          deadline:item.deadline,
          priority: item.priority,
          note: item.note,
          status: item.status,
          montant:item.montant,
          totalTask:item.totalTask
        };
        this.tacheService.createTache(tache,this.projectId).subscribe(() => {
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
