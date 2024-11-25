import { ContactProjetService } from './contact-projet.service';
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact/contact.service';
import { Contact } from '../client/contact';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-projet',
  templateUrl: './contact-projet.component.html',
  styleUrls: ['./contact-projet.component.css']
})
export class ContactProjetComponent implements OnInit{
  contacts: any[] = [];
  updatedContact: Contact | undefined;
  selectedProjectId: number | null = null; // Ajoutez cette ligne

  constructor(private contactProjetService: ContactProjetService,private contactService:ContactService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      const projectId = params.get('projectId');
      console.log(projectId);
      if (projectId !== null) {
        // Le '+' convertit la chaîne en nombre, mais seulement si projectId n'est pas null
        this.loadContacts(+projectId);
        
          this.selectedProjectId = +projectId;
console.log(this.selectedProjectId );
        
      } else {
        // Gérez le cas où projectId est null
        console.error("Le projet ID est manquant dans l'URL");
      }
    });
  }
  

  loadContacts(projectId: number) {
    this.contactProjetService.getContactsByProjectId(projectId).subscribe(data => {
      this.contacts = data;
    }, error => {
      console.error("Erreur lors de la récupération des contacts", error);
    });
  }
  openModalDelete(contactId: number) {
    this.contactService.selectedcontactId = contactId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }

  openModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
  }

  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  openModalUpdate(contactId: number) {
    this.contactService.selectedcontactId = contactId;
    this.contactService.getContactById(contactId).subscribe(contact => {
        this.updatedContact = contact;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });
}
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }


  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }

}
