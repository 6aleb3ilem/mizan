import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';
import { ItemService } from '../item.service';
import { Item } from '../item'; // Import the Item model if not already imported
import { Unite } from 'src/app/unite/unite';
import { Element } from '../element';
import { Tache } from '../tache';

@Component({
  selector: 'app-import-modalitem',
  templateUrl: './import-modalitem.component.html',
  styleUrl: './import-modalitem.component.css'
})
export class ImportModalitemComponent {
  file: File | null = null;
  @Input() taskId!: number;
  @Input() ElementId!: number;

  constructor(private itemService: ItemService) {}

  onFileChange(event: any): void {
    this.file = event.target.files[0];
  }

  importData(): void {
    if (!this.file) {
      console.error('No file selected!');
      return;
    }
  
    this.itemService.getTaskDates(this.taskId).subscribe({
      next: (taskDates) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const arrayBuffer: any = e.target!.result;
          const data = new Uint8Array(arrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });
  
          jsonData.forEach((dataItem: any) => {
            const tache: Tache = {
              taskId: dataItem.taskid || 0,
              name: dataItem.taskname || "",
              priority: dataItem.priority || "",
              status: dataItem.status || "",
              note: dataItem.note || "",
              start: dataItem.start || "", // Assurez-vous que ce n'est pas une chaîne vide
              deadline: dataItem.deadline || "",
            
          };
          const element: Element = {
              id: dataItem.elementid || 0, 
              name: dataItem.name || "",
              note: dataItem.note || "",
              type: dataItem.type || { id_type: 0, label: "" } // Assurez-vous que cela correspond à votre modèle de type
          };
          // Ensure all date and other conversions are done correctly here
          const newItem: Item = {
            id: dataItem.id || 0,
            name: dataItem.name || "",
            elementNote: dataItem.elementNote || "",
            nbreLots: dataItem.nbreLots || 0,
            qteLots: dataItem.qteLots || "",
            elementQty: dataItem.elementQty || 0,
            status: dataItem.status.label || "",
            refEdevis: dataItem.refEdevis || "",
            element: element, // Utilisez l'objet element créé précédemment
            taskid: tache.taskId || 0,
            elementid: element.id || 0,
            prix_unitaire: dataItem.prix_unitaire || 0,
            montant: dataItem.montant || 0,
            unite: dataItem.unite || "",
            type: dataItem.type || "",
        };
        
          console.log(newItem);
          // Replace task.taskId and element.id with appropriate logic
          this.itemService.createItem(newItem, newItem.taskid, newItem.elementid).subscribe({
            next: () => {
              console.log('Data imported successfully');
              // Handle successful import
            },
            error: (error) => {
              console.error('Error importing data:', error);
              // Handle errors
            }
          });
          });
        };
        if (this.file) {
          fileReader.readAsArrayBuffer(this.file);
        } else {
          console.error('File is null when attempting to read.');
        }
      },
      error: (error) => {
        console.error('Error fetching task dates:', error);
      }
    });
  }
  

  closeModalimp() {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  
}
