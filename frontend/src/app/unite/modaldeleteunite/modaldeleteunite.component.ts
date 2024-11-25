//modaldeleteunite.component.ts
import { Component } from '@angular/core';
import { UniteService } from '../unite.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Tarif } from 'src/app/tarif/tarif';
@Component({
  selector: 'app-modaldeleteunite',
  templateUrl: './modaldeleteunite.component.html',
  styleUrls: ['./modaldeleteunite.component.css']
})
export class ModaldeleteuniteComponent {
  // Change uniteService to public so it can be accessed in the template
  constructor(public uniteService: UniteService, private router: Router) {}
  tarif: Tarif[] = [];
  ngOnInit(): void {
    forkJoin({
      tarif: this.uniteService.getAllTarifs().pipe(take(1))
    }).subscribe(({ tarif }) => {
      this.tarif = tarif;
      console.log('tarif:', this.tarif);
    });
  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.uniteService.selectedUniteId); // Now this uses the public service
  }

  deleteUnite() {
    if (this.uniteService.selectedUniteId) {
      let elementId = this.uniteService.selectedUniteId;

      if (elementId !== null) {
        // console.log('tarif:', this.tarif);
    
        const hasItem = this.tarif.some(tarif => tarif.unite && tarif.unite.id === elementId);
    
        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasItem) {
          const warningtarif = document.getElementById('warningElement');
          console.log('tarif:', this.tarif);
          if (warningtarif) {
            console.log('tarif:', this.tarif);
            warningtarif.style.display = 'block';
          }
          return; // Stopper la suppression car un tarif ou un tarif est associé à cet élément
        } else {
      this.uniteService.deleteUniteById({ id: this.uniteService.selectedUniteId }).subscribe({
        next: () => {
          console.log('Unite deleted successfully');
          // Ici, vous pouvez mettre à jour l'affichage ou naviguer vers une autre route
          // par exemple, rafraîchir la liste des unités
          this.router.navigate(['/unite']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error deleting Unite:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      });}}
    } else {
      console.log('No Unite ID selected');
    }
    this.closeModalDelete(); // Close modal after deletion
  }
  
}
