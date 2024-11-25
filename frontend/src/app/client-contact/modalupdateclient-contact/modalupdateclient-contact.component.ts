import { Component, Input, OnInit } from '@angular/core';
import { ClientContactService } from '../client-contact.service';
import { Clientcontact } from '../clientcontact';
import { Contact } from '../../contact/contact';
import { ContactService } from '../../contact/contact.service';

@Component({
  selector: 'app-modalupdateclient-contact',
  templateUrl: './modalupdateclient-contact.component.html',
  styleUrls: ['./modalupdateclient-contact.component.css']
})
export class ModalupdateclientContactComponent implements OnInit {
  @Input() clientId!: number;
  availableContacts: Contact[] = [];
  @Input() updatedClientcontact: Clientcontact | null = null;
  showPrincipalExistsWarning = false;
  constructor(private clientcontactService: ClientContactService, private contactService: ContactService) {}

  ngOnInit() {
    this.clientcontactService.getAllAvailableContacts(this.clientId).subscribe(contactes => {
      this.availableContacts = contactes;
    });
  }

  loadAvailableContacts() {
    this.clientcontactService.getAllAvailableContacts(this.clientId).subscribe(contacts => {
      this.availableContacts = contacts;
    });
  }
  
  onPrincipalChange() {
    // Si la checkbox est cochée, vérifier s'il existe déjà un contact principal.
    if (this.updatedClientcontact!.isPrincipal) {
      this.clientcontactService.checkPrincipalContactExistsForClient(this.clientId).subscribe(exists => {
        // Si un autre contact principal existe, afficher l'avertissement.
        // Vous pouvez également vérifier si le contact principal existant n'est pas celui en cours de mise à jour.
        this.showPrincipalExistsWarning = false;
        console.log("lguaba2")
      });
    } else {
      // Si la checkbox est décochée, cacher l'avertissement.
      this.showPrincipalExistsWarning = true;
    }
  }
  
  
  updateClientcontact() {
    if (this.updatedClientcontact && this.updatedClientcontact.id) {
      this.clientcontactService.updateClientContact(this.updatedClientcontact.id, this.updatedClientcontact).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Tarif:', error);
      });
    } else {
      console.error('updatedClientcontact is null or missing ID');
    }
  }


  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
}
