import { Component, OnInit,Input } from '@angular/core';
import { Contact } from 'src/app/contact/contact';
import { ContactService } from 'src/app/contact/contact.service';
import { Client } from 'src/app/tache/client';
import { ContactProjetService } from '../contact-projet.service';
import { Router } from '@angular/router';
import 'select2'; // Importation du module Select2
import * as $ from 'jquery';

@Component({
  selector: 'app-modaladdcontact-projet',
  templateUrl: './modaladdcontact-projet.component.html',
  styleUrls: ['./modaladdcontact-projet.component.css']
})
export class ModaladdcontactProjetComponent implements OnInit {
  contacts: Contact[] = [];
  selectedProjectId: number | null = null; // Supposons que vous ayez un moyen de définir ceci, par exemple, via une sélection dans l'interface utilisateur
  client: Client | null = null;
  @Input() projectId: number | null = null;
  clientName: string = '';
  selectedContactId: number | null = null;
  clientId: number | null = null;
  private selectElement!: JQuery; // Déclarez selectElement en tant que propriété de la classe

  constructor(private router: Router,private contactService: ContactService,private contactProjetService: ContactProjetService) { }

 
  ngOnInit() {
    console.log("Project ID:", this.projectId); // Pour déboguer

    this.loadContacts();
    if (this.projectId) {
      this.loadClientForProject(this.projectId);
      
    }
  }
  ngAfterViewInit(): void {
    this.selectElement = $('#contact-projet');
    this.selectElement.select2({
      placeholder: "Sélectionnez une profession",
      allowClear: true,
      width: '97%'
    });

    // Utilisez this.selectElement pour accéder à l'élément select2
    this.selectElement.on('change', (event) => {
      const value = $(event.target).val();
      if (value !== undefined) {
        this.selectedContactId = Number(value); // Assurez-vous que la valeur est convertie en nombre
      }
    });
    
  }
  loadContacts(): void {
    this.contactProjetService.getContactsNotLinkedToProject(this.projectId!).subscribe({
      next: (data) => this.contacts = data,
      error: (err) => console.error('Erreur lors de la récupération des contacts', err)
    });
  }

  loadClientForProject(projectId: number): void {
    this.contactProjetService.getClientByProjectId(projectId).subscribe({
      next: (client) => {
        this.client = client;
        this.clientName = client.name; // Mettre à jour clientName avec le nom du client chargé
        this.clientId=client.id;
      },
      error: (err) => console.error('Erreur lors de la récupération du client', err)
    });
  }
  
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  onAddContactToProject(): void {
    if (this.selectedContactId && this.clientId && this.projectId) {
      this.contactProjetService.addOrUpdateContactProjectRelation(this.selectedContactId, this.clientId, this.projectId).subscribe({
        next: () => {
          console.log('Relation ajoutée avec succès');
          // Supposons que vous avez une méthode loadData() qui rafraîchit les données nécessaires
          window.location.reload();
          this.closeModal();
          // Après le chargement des données, naviguez et fermez la modal
          // this.router.navigate([`/contact-projet/${this.projectId}`]).then(() => {
          //   this.closeModal(); // Assurez-vous que cette action est la dernière
          // });
        },
        error: (error) => console.error('Erreur lors de l\'ajout de la relation', error)
      });
    } else {
      console.error('Un ou plusieurs IDs nécessaires sont manquants');
    }
  }
}  