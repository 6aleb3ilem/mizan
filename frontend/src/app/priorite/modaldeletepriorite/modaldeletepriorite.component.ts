//modaldeletePriorite.component.ts
import { Component , OnInit} from '@angular/core';
import { PrioriteService } from '../priorite.service';
import { Priorite } from '../priorite';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Tache } from 'src/app/tache/tache';
@Component({
  selector: 'app-modaldeletepriorite',
  templateUrl: './modaldeletepriorite.component.html',
  styleUrls: ['./modaldeletepriorite.component.css']
})
export class ModaldeleteprioriteComponent{
  constructor(private prioriteService: PrioriteService,private router: Router) {}
  prioriteToDeleteId: number | undefined;
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.prioriteToDeleteId)
  }
  tache: Tache[] = [];
  ngOnInit(): void {
    forkJoin({
      tache: this.prioriteService.getAllTaches().pipe(take(1))
    }).subscribe(({ tache }) => {
      this.tache = tache;
      console.log('tache:', this.tache);
    });
  }
  deletePriorite() {
    if (this.prioriteService.selectedPrioriteId) {
      let elementId = this.prioriteService.selectedPrioriteId;

      if (elementId !== null) {
        // console.log('tache:', this.tache);
    
        const hasItem = this.tache.some(tache => tache.priority && tache.priority.id === elementId);
    
        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasItem) {
          const warningtache = document.getElementById('warningElement');
          console.log('tache:', this.tache);
          if (warningtache) {
            console.log('tache:', this.tache);
            warningtache.style.display = 'block';
          }
          return; // Stopper la suppression car un tache ou un tache est associé à cet élément
        } else {
      this.prioriteService.deletePrioriteById({ id: this.prioriteService.selectedPrioriteId }).subscribe({
        next: () => {
          console.log('Priorite deleted successfully');
          window.location.reload();
          // Code pour rafraîchir la liste ou naviguer vers une autre page
        },
        error: (error) => {
          console.error('Error deleting Priorite:', error);
          // Afficher une notification d'erreur ou un message à l'utilisateur
        }
      });}}
    }
    this.closeModalDelete(); // Close modal after deletion
    
  }
  
  
}
