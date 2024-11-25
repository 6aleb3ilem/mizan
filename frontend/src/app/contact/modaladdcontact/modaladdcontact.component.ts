import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';
import { Contact } from '../contact';
import { NgForm } from '@angular/forms';
import 'select2'; // Importation du module Select2
import * as $ from 'jquery';

@Component({
  selector: 'app-modaladdcontact',
  templateUrl: './modaladdcontact.component.html',
  styleUrls: ['./modaladdcontact.component.css']
})

export class ModaladdcontactComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }

  private whatsappChangedManually = false;
  private selectElement!: JQuery; // Déclarez selectElement en tant que propriété de la classe

  Professions: any[] = [];
  newContact: Contact = {
    id:0,
    address: '',
    email: '',
    name: '',
    note: '',
    profession:{id:0,label:''},
    telephone: '',
    whatsapp: '', // Nouveau champ pour le numéro WhatsApp

    clients: [], 
  };

  constructor(private contactService: ContactService, private router: Router) {}
  ngOnInit(): void {
    this.contactService.getAllProfessions().subscribe(professions => {
      this.Professions = professions;
    });
  }
  
  @ViewChild('contactForm') contactForm!: NgForm;
  addContact(): void {
    if (this.contactForm && !this.contactForm.valid || (this.newContact.email && !this.isValidEmail(this.newContact.email)) || !this.newContact.profession.id) {
      return; // Ne pas soumettre le formulaire si les conditions ne sont pas remplies
    }
    if (this.contactForm && !this.contactForm.valid || (this.newContact.email && !this.isValidEmail(this.newContact.email))) {
      return; // Ne pas soumettre le formulaire si les conditions ne sont pas remplies
    }
  
    if (!this.isAdding) {
      this.isAdding = true;
      this.contactService.createContact(this.newContact).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du contact
      this.router.navigate(['/contact']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email ? emailRegex.test(email) : true;
  }  
  onTelephoneChange(): void {
    if (!this.whatsappChangedManually) {
      this.newContact.whatsapp = this.newContact.telephone;
    }
  }

  
  onWhatsAppChange(): void {
    this.whatsappChangedManually = true;
  }
}