import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Profession } from '../../profession/profession';
import { Router } from '@angular/router';
import { Contact } from '../contact';

@Component({
  selector: 'app-modalupdatecontact',
  templateUrl: './modalupdatecontact.component.html',
  styleUrls: ['./modalupdatecontact.component.css']
})
export class ModalupdatecontactComponent implements AfterViewInit{
  @Input() updatedContact: Contact | null = { id: 0, address: '', email: '', name: '', note: '',  telephone: '', whatsapp: '', clients: [] ,profession:{id:0,label:''}}; // Ajout de la propriété whatsapp
  professions: Profession[] = [];
  private selectElement!: JQuery; // Déclarez selectElement en tant que propriété de la classe

  constructor(private router: Router, private contactService: ContactService) {}

  ngOnInit() {
    // Subscribe to changes in selectedcontactId and update the form fields accordingly
    this.contactService.selectedcontactId$.subscribe((contactId) => {
      if (contactId) {
        this.contactService.getContactById(contactId).subscribe(contact => {
          this.updatedContact = contact;
        });
      }
    });
    this.contactService.getAllProfessions().subscribe(professions => {
      this.professions = professions;
    });
  }
  ngAfterViewInit() {
    $('.select-search').select2();
}
  
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }

  updateContact() { // Renamed the method to updateContact
    if (this.contactService.selectedcontactId && this.updatedContact) {
      this.contactService.updateContact(this.contactService.selectedcontactId, this.updatedContact).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating client:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedcontactId or updatedContact is null');
      // Handle the error if selectedcontactId or updatedContact is null
    }
  }
}
