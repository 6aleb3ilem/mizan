import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BctService } from '../bct.service';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from 'src/app/projets/project';
@Component({
  selector: 'app-modaldelete',
 
  templateUrl: './modaldelete.component.html',
  styleUrl: './modaldelete.component.css'
})
export class ModaldeleteComponent {

  // Change uniteService to public so it can be accessed in the template
  constructor(public bctService: BctService, private router: Router) {}
  projet: Project[] = [];
  ngOnInit(): void {
    forkJoin({
      projet: this.bctService.getAllProjects().pipe(take(1))
    }).subscribe(({ projet }) => {
      this.projet = projet;
      console.log('projet:', this.projet);
    });
  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.bctService.selectedBCTId); // Now this uses the public service
  }

  deleteBCT() {
    if (this.bctService.selectedBCTId) {
      let elementId = this.bctService.selectedBCTId;
  
        if (elementId !== null) {
          // console.log('projet:', this.projet);
      
          const hasItem = this.projet.some(projet => projet.situation && projet.situation.id === elementId);
      
          // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
          // debugger;
      
          if (hasItem) {
            const warningprojet = document.getElementById('warningElement');
            console.log('projet:', this.projet);
            if (warningprojet) {
              console.log('projet:', this.projet);
              warningprojet.style.display = 'block';
            }
            return; // Stopper la suppression car un projet ou un projet est associé à cet élément
          } else {
      this.bctService.deleteBCTById({ id: this.bctService.selectedBCTId }).subscribe({
        next: () => {
          console.log('BCT deleted successfully');
          // Ici, vous pouvez mettre à jour l'affichage ou naviguer vers une autre route
          // par exemple, rafraîchir la liste des unités
          this.router.navigate(['/bcts']).then(() => {
            window.location.reload();
          });
        },
        error: (error) => {
          console.error('Error deleting Unite:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      });}}
    } else {
      console.log('No BCT ID selected');
    }
    this.closeModalDelete(); // Close modal after deletion
  }
  
}
