//modaldeleteElement.component.ts
import { Component , OnInit} from '@angular/core';
import { ElementService } from '../element.service';
import { Element } from '../element';
import { Router } from '@angular/router';
import { Tarif } from 'src/app/tarif/tarif';
import { Item } from 'src/app/item/item';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-modaldeleteelement',
  templateUrl: './modaldeleteelement.component.html',
  styleUrls: ['./modaldeleteelement.component.css']
})
export class ModaldeleteelementComponent{
  constructor(private elementService: ElementService,private router: Router) {}
  elementToDeleteId: number | undefined;
  tarifs: Tarif[] = [];
  items: Item[] = [];
checkIfTarifOrItemExists() {
    const elementId = this.elementToDeleteId;
    if (!elementId) {
      console.error('No Element ID provided');
      return;
    }

    const hasTarif = this.tarifs.some(tarif => tarif.element.id === elementId);
    const hasItem = this.items.some(item => item.element.id === elementId);

    if (hasTarif || hasItem) {
      const warningElement = document.getElementById('warningElement');
      if (warningElement) {
        warningElement.style.display = 'block';
      }
    }
  }
  ngOnInit(): void {
    forkJoin({
      tarifs: this.elementService.getAllTarifs().pipe(take(1)),
      items: this.elementService.getAllItems().pipe(take(1))
    }).subscribe(({ tarifs, items }) => {
      this.tarifs = tarifs;
      this.items = items;
      console.log('Tarifs:', this.tarifs);
      console.log('Items:', this.items);
    });
  }
  
  
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.elementToDeleteId)
  }

  // ModaldeleteelementComponent.ts
  deleteElement() {
    let elementId = this.elementService.selectedElementId;
    
    if (elementId !== null) {
      console.log('Tarifs:', this.tarifs);
      console.log('Items:', this.items);
  
      const hasTarif = this.tarifs.some(tarif => tarif.element && tarif.element.id === elementId);
      const hasItem = this.items.some(item => item.element && item.element.id === elementId);
  
      // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
      // debugger;
  
      if (hasTarif || hasItem) {
        const warningElement = document.getElementById('warningElement');
        if (warningElement) {
          warningElement.style.display = 'block';
        }
        return; // Stopper la suppression car un tarif ou un item est associé à cet élément
      } else {
        this.elementService.deleteElementById(elementId).subscribe({
          next: () => {
            console.log('Element deleted successfully');
            this.closeModalDelete();
            window.location.reload();
            this.router.navigate(['/element']); // Ajustez selon votre route
          },
          error: (error) => {
            console.error('Error deleting Element:', error);
            console.error('hasitem:',hasItem);
            console.error('hastarif:',hasTarif)
  
          }
        });
      }
    } else {
      console.error('No Element ID provided');
    }
  }
  
  
}
