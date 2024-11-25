import { Component , OnInit} from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Clientcontact } from 'src/app/client-contact/clientcontact';
import { forkJoin } from 'rxjs';
import { Tache } from '../tache'
import { Devis } from '../devis';
@Component({
  selector: 'app-modaldeleteprojet',
  templateUrl: './modaldeleteprojet.component.html',
  styleUrls: ['./modaldeleteprojet.component.css']
})
export class ModaldeleteprojetComponent {
  constructor(private ProjectService: ProjectService,private router: Router) {}
  ProjectToDeleteId: number | undefined;
  contacts: Clientcontact[] = [];
  taches: Tache[] = [];
  devis: Devis[] = [];

  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
  showError = false;
  errorMessage = '';

  ngOnInit(): void {
    forkJoin({
      contacts: this.ProjectService.getAllClientContacts().pipe(take(1)),
      taches:this.ProjectService.getAllTaches().pipe(take(1)),
      devis:this.ProjectService.getAllDevisfs().pipe(take(1)),
    }).subscribe(({ taches,contacts,devis }) => {
      this.taches=taches;
      this.devis=devis;
      this.contacts = contacts;
      console.log('taches:', this.taches);
      console.log('devis:', this.devis);
      console.log('contacts:', this.contacts);

    });
  }
  deleteProject() {
    if (this.ProjectService.selectedProjectId) {
      let elementId = this.ProjectService.selectedProjectId;

      if (elementId !== null) {
        console.log('taches:', this.taches);
      console.log('devis:', this.devis);
      console.log('contacts:', this.contacts);
    
        const hastaches = this.taches.some(taches => taches.project && taches.project.projectId === elementId);
        const hasdevis = this.devis.some(devis => devis.project && devis.project.projectId === elementId);

        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hastaches || hasdevis) {
          const warningElement = document.getElementById('warningElement');
          if (warningElement) {
            warningElement.style.display = 'block';
          }
          return; // Stopper la suppression car un tarif ou un contacts est associé à cet élément
        } else {
      this.ProjectService.deleteProjectById(this.ProjectService.selectedProjectId).subscribe({
        next: () => {
          console.log('Project deleted successfully');
          this.closeModalDelete(); // Close modal after successful deletion
          window.location.reload(); // Consider using Angular router instead of window.location.reload
        },
        error: (error) => {
          let errorMessage = "La suppression du projet a échoué. Veuillez d'abord supprimer les tâches et les devis associés au projet.";
          // S'assurer que error.error est une chaîne
          if (typeof error.error === 'string') {
            const errorMessages = [];
            if (error.error.includes("La suppression du projet a échoué. Veuillez d'abord supprimer les tâches et les devis associés au projet.")) {
              // errorMessages.push("Le titre du projet est déjà utilisé.");
            }
            if (error.error.includes("La suppression du projet a échoué. Veuillez d'abord supprimer les tâches et les devis associés au projet.")) {
              errorMessages.push("La suppression du projet a échoué. Veuillez d'abord supprimer les tâches et les devis associés au projet.");
            }
            errorMessage = errorMessages.length > 0 ? errorMessages.join(" ") : errorMessage;
          } else {
            // Si error.error n'est pas une chaîne, traiter différemment ou logger pour le debug
            console.log("Structure d'erreur non attendue:", error.error);
          }
        
          alert(errorMessage);
          this.closeModalDelete(); // Close modal after successful deletion
          window.location.reload(); // Consider using Angular router instead of window.location.reload
        }
      });}}
    }
  }
}
