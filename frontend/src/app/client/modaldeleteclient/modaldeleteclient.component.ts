//modaldeleteclient.component.ts
import { Component , OnInit} from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { Router } from '@angular/router';
import { Project } from 'src/app/projets/project';
import { Clientcontact } from 'src/app/client-contact/clientcontact';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-modaldeleteclient',
  templateUrl: './modaldeleteclient.component.html',
  styleUrls: ['./modaldeleteclient.component.css']
})
export class ModaldeleteclientComponent{
  constructor(private clientService: ClientService,private router: Router) {}
  clientToDeleteId: number | undefined;
  projects: Project[] = [];
  contacts: Clientcontact[] = [];
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.clientToDeleteId)
  }
  ngOnInit(): void {
    forkJoin({
      projects: this.clientService.getAllProjects().pipe(take(1)),
      contacts: this.clientService.getAllClientContacts().pipe(take(1))
    }).subscribe(({ projects, contacts }) => {
      this.projects = projects;
      this.contacts = contacts;
      console.log('projects:', this.projects);
      console.log('contacts:', this.contacts);
    });
  }
  deleteClient() {
    if (this.clientService.selectedClientId) {
      let elementId = this.clientService.selectedClientId;

      if (elementId !== null) {
        console.log('projects:', this.projects);
        console.log('contacts:', this.contacts);
    
        const hasTarif = this.projects.some(projects => projects.client && projects.client.id === elementId);
        const hasItem = this.contacts.some(contacts => contacts.client && contacts.client.id === elementId);
    
        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasTarif || hasItem) {
          const warningElement = document.getElementById('warningElement');
          if (warningElement) {
            warningElement.style.display = 'block';
          }
          return; // Stopper la suppression car un tarif ou un contacts est associé à cet élément
        } else {
      this.clientService.deleteClientById(this.clientService.selectedClientId).subscribe({
        next: () => {
          console.log('Item deleted successfully');
          this.closeModalDelete(); // Close modal after deletion
          window.location.reload(); // Consider using Angular router instead of window.location.reload
        },  error: (error) => {
          let errorMessage = "La suppression du client a échoué. Veuillez d'abord supprimer les projets, les tâches et les devis associés au client.";
          // S'assurer que error.error est une chaîne
          if (typeof error.error === 'string') {
            const errorMessages = [];
            if (error.error.includes("La suppression du client a échoué. Veuillez d'abord supprimer les projets, les tâches et les devis associés au client.")) {
            }
            if (error.error.includes("La suppression du client a échoué. Veuillez d'abord supprimer les projets, les tâches et les devis associés au client.")) {
              errorMessages.push("La suppression du client a échoué. Veuillez d'abord supprimer les projets, les tâches et les devis associés au client.");
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
      });
    }}}
  }
}
