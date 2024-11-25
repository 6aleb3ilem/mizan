//modaldeleteSituation.component.ts
import { Component , OnInit} from '@angular/core';
import { SituationService } from '../situation.service';
import { Situation } from '../situation';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Project } from 'src/app/projets/project';
@Component({
  selector: 'app-modaldeletesituation',
  templateUrl: './modaldeletesituation.component.html',
  styleUrls: ['./modaldeletesituation.component.css']
})
export class ModaldeletesituationComponent{
  constructor(private situationService: SituationService,private router: Router) {}
  situationToDeleteId: number | undefined;
  projet: Project[] = [];
  ngOnInit(): void {
    forkJoin({
      projet: this.situationService.getAllProjects().pipe(take(1))
    }).subscribe(({ projet }) => {
      this.projet = projet;
      console.log('projet:', this.projet);
    });
  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.situationToDeleteId)
  }

  deleteSituation() {
    if (this.situationService.selectedSituationId) {
        let elementId = this.situationService.selectedSituationId;
  
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
      this.situationService.deleteSituationById({ id: this.situationService.selectedSituationId }).subscribe({
        next: () => {
          console.log('Situation deleted successfully');
          window.location.reload();
          // Code pour rafraîchir la liste ou naviguer vers une autre page
        },
        error: (error) => {
          console.error('Error deleting Situation:', error);
          // Afficher une notification d'erreur ou un message à l'utilisateur
        }
      });}}
    }
    this.closeModalDelete(); // Close modal after deletion
    
  }
  
  
}
