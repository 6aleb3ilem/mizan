import { Component , OnInit} from '@angular/core';
import { TacheService } from '../tache.service';
import { Tache } from '../tache';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Item } from '../../item/item';
@Component({
  selector: 'app-modaldeletetache',
  templateUrl: './modaldeletetache.component.html',
  styleUrls: ['./modaldeletetache.component.css']
})
export class ModaldeletetacheComponent {
  constructor(private TacheService: TacheService,private router: Router) {}
  TacheToDeleteId: number | undefined;
  items: Item[] = [];
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
  deleteTache() {
    const selectedTacheId = this.TacheService.selectedTacheId;
    if (selectedTacheId !== null) {
      this.TacheService.hasElementDevis(selectedTacheId).subscribe(hasElement => {
        if (hasElement) {
          const warningElement = document.getElementById('warningElement');
          if (warningElement) {
            warningElement.style.display = 'block';
          }         
           console.log('Il existe un élément de devis associé à cette tâche. Suppression annulée.');
          return;
        } else {
          this.TacheService.deleteTacheById(selectedTacheId).subscribe({
            next: () => {
              console.log('Tâche supprimée avec succès');
              this.closeModalDelete();
              window.location.reload();
            },
            error: (error) => {
              console.error('Erreur lors de la suppression de la tâche :', error);
            }
          });
        }
      });
    } else {
      console.error('L\'ID de la tâche sélectionnée est null.');
    }
  }
  
}  
