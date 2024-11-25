
import { Component , OnInit} from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Clientcontact } from 'src/app/client-contact/clientcontact';
@Component({
  selector: 'app-modaldeletecontact',
  templateUrl: './modaldeletecontact.component.html',
  styleUrls: ['./modaldeletecontact.component.css']
})
export class ModaldeletecontactComponent {
  constructor(private ContactService: ContactService,private router: Router) {}
  ContactToDeleteId: number | undefined;
  contacts: Clientcontact[] = [];

  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
  ngOnInit(): void {
    forkJoin({
      contacts: this.ContactService.getAllClientContacts().pipe(take(1))
    }).subscribe(({ contacts }) => {
      this.contacts = contacts;
      console.log('contacts:', this.contacts);
    });
  }
  deleteContact() {
    if (this.ContactService.selectedcontactId) {
      let elementId = this.ContactService.selectedcontactId;

      if (elementId !== null) {
        console.log('contacts:', this.contacts);
    
        const hasItem = this.contacts.some(contacts => contacts.client && contacts.client.id === elementId);
    
        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasItem) {
          const warningElement = document.getElementById('warningElement');
          if (warningElement) {
            warningElement.style.display = 'block';
          }
          return; // Stopper la suppression car un tarif ou un contacts est associé à cet élément
        } else {
      this.ContactService.deleteContactById(this.ContactService.selectedcontactId).subscribe({
        next: () => {
          console.log('Item deleted successfully');
          this.closeModalDelete(); // Close modal after deletion
          window.location.reload(); // Consider using Angular router instead of window.location.reload
        },  error: (error) => {
          let errorMessage = "La suppression du contact a échoué. Veuillez d'abord supprimer les projets, les clients associés au contact.";
          // S'assurer que error.error est une chaîne
          if (typeof error.error === 'string') {
            const errorMessages = [];
            if (error.error.includes("La suppression du contact a échoué. Veuillez d'abord supprimer les projets, les clients associés au contact.")) {
            }
            if (error.error.includes("La suppression du contact a échoué. Veuillez d'abord supprimer les projets, les clients associés au contact.")) {
              errorMessages.push("La suppression du contact a échoué. Veuillez d'abord supprimer les projets, les clients associés au contact.");
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
