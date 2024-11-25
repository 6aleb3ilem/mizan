//modaldeleteType.component.ts
import { Component , OnInit} from '@angular/core';
import { TypeService } from '../type.service';
import { Type } from '../type';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Element } from 'src/app/element/element';
@Component({
  selector: 'app-modaldeletetype',
  templateUrl: './modaldeletetype.component.html',
  styleUrls: ['./modaldeletetype.component.css']
})
export class ModaldeletetypeComponent{
  constructor(private typeService: TypeService,private router: Router) {}
  typeToDeleteId: number | undefined;
  Element: Element[] = [];
  ngOnInit(): void {
    forkJoin({
      Element: this.typeService.getAllElements().pipe(take(1))
    }).subscribe(({ Element }) => {
      this.Element = Element;
      console.log('Element:', this.Element);
    });
  }

  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.typeToDeleteId)
  }

  deleteType() {
    if (this.typeService.selectedTypeId) {
      let elementId = this.typeService.selectedTypeId;

      if (elementId !== null) {
        console.log('Element:', this.Element);
    
        const hasItem = this.Element.some(Element => Element.type && Element.type.id_type === elementId);
    
        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasItem) {
          const warningElement = document.getElementById('warningElement');
          if (warningElement) {
            warningElement.style.display = 'block';
          }
          return; // Stopper la suppression car un tarif ou un Element est associé à cet élément
        } else {
      this.typeService.deleteTypeById({ id: this.typeService.selectedTypeId }).subscribe({
        next: () => {
          console.log('Type deleted successfully');
          window.location.reload();
          // Code pour rafraîchir la liste ou naviguer vers une autre page
        },
        error: (error) => {
          console.error('Error deleting Type:', error);
          // Afficher une notification d'erreur ou un message à l'utilisateur
        }
      });}}
    }
    this.closeModalDelete(); // Close modal after deletion
    
  }
  
  
}
