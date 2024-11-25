//modaldeleteclientcontact.component.ts
import { Component , OnInit} from '@angular/core';
import { ClientContactService } from '../client-contact.service';
import { Clientcontact } from '../clientcontact';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modaldeleteclient-contact',
  templateUrl: './modaldeleteclient-contact.component.html',
  styleUrls: ['./modaldeleteclient-contact.component.css']
})
export class ModaldeleteclientContactComponent{
  clientcontacts: Clientcontact[] | undefined;
  constructor(private clientcontactService: ClientContactService,private router: Router) {}
  clientcontactToDeleteId: number | undefined;
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.clientcontactToDeleteId)
  }

  deleteClientcontact() {
  if (this.clientcontactService.selectedClientContactId) {
    this.clientcontactService.deleteClientContact(this.clientcontactService.selectedClientContactId).subscribe({
      next: () => {
        console.log('clientcontact deleted successfully');
        this.refreshClientcontactsList();
        window.location.reload();

      },
      error: (error) => {
        console.error('Error deleting clientcontact:', error);
      }
    });
  }
  this.closeModalDelete();
  
}

// Ajoutez cette méthode dans le composant clientcontact pour rafraîchir la liste des clientcontacts
refreshClientcontactsList() {
  this.clientcontactService.getAllClientContacts().subscribe(clientcontacts => {
    this.clientcontacts = clientcontacts;
  });
}
}
