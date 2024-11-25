import { Component, Input, OnInit } from '@angular/core';
import { ClientContactService } from '../client-contact.service';
import { ContactService } from '../../contact/contact.service';
import { Contact } from '../../contact/contact';
import { Clientcontact } from '../clientcontact';

@Component({
  selector: 'app-modaladdclient-contact',
  templateUrl: './modaladdclient-contact.component.html',
  styleUrls: ['./modaladdclient-contact.component.css']
})
export class ModaladdclientcontactComponent implements OnInit {
  @Input() clientId!: number;
  contacts: Contact[] = [];
  newClientcontact: Clientcontact = {
    id: 0,
    client: { 
      id: this.clientId, // Assurez-vous d'avoir l'ID correct ici.
      name: '', 
      note: '',
      telephone:'',email:'',address:'',status: {id:0,label:'',tableref:''},
      contacts:[]
    },
    contact: {profession:{id:0,label:''}, id: 0, telephone: '',name:'',email:'',address:'',note:'',clients:[],whatsapp:'' },
    isPrincipal: false
  };
  
  isAdding: boolean = false;

  constructor(private clientcontactService: ClientContactService, private contactService: ContactService) {}

  ngOnInit(): void {
    console.log("Received clientId:", this.clientId);
    this.newClientcontact.client.id = this.clientId;
    this.clientcontactService.getAllAvailableContacts(this.clientId).subscribe((contacts) => {
      this.contacts = contacts;
      // Sélectionnez le premier contact comme par défaut si la liste n'est pas vide
      if (this.contacts && this.contacts.length > 0) {
        this.newClientcontact.contact.id = this.contacts[0].id;
      }
    });
  }
  
  submitcontactclient() {
    this.addcontactclient();
}
onPrincipalChange() {
  // Réinitialiser l'avertissement si la checkbox est décochée
  if (!this.newClientcontact.isPrincipal) {
    this.showPrincipalExistsWarning = false;
    return;
  }

  // Vérifier l'existence d'un tarif principal si la checkbox est cochée
  if (this.newClientcontact.isPrincipal) {
    this.clientcontactService.checkPrincipalContactExistsForClient(this.clientId).subscribe(exists => {
      console.log('Existe un contact principal dans n’importe quelle client:', exists);
      this.showPrincipalExistsWarning = exists;  // Affiche ou cache l'avertissement basé sur l'existence d'un tarif principal
    });
  }
}

showPrincipalExistsWarning = false;


  
addcontactclient(): void {
  if (!this.isAdding) {
    this.isAdding = true;
    this.newClientcontact.client.id = this.clientId; // Assurez-vous que l'ID est défini ici
    if (this.newClientcontact.client.id) {
      this.clientcontactService.createClientContact(this.newClientcontact).subscribe({
        next: (result) => {
          this.closeModal();
          window.location.reload();
          this.isAdding = false;

        },
        error: (error) => {
          console.error('Erreur lors de la création du tarif', error);
          this.isAdding = false;
        }
      });
    } else {
      console.error('clientId is not defined');
      this.isAdding = false;
    }
  }
}



  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}