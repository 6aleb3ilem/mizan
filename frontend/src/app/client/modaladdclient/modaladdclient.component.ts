import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Client } from '../client';
@Component({
  selector: 'app-modaladdclient',
  templateUrl: './modaladdclient.component.html',
  styleUrls: ['./modaladdclient.component.css']
})

export class ModaladdclientComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newClient: Client = {
    id:0,
    name: '',
    email: '',
    telephone: '',
    address: '',
    status: {id:0,label:'',tableref:''},
    note: '',
    contacts: [], };
    Status: any[] = [];

  constructor(private clientService: ClientService, private router: Router) {}
  ngOnInit(): void {
    
    this.clientService.getAllStatuss().subscribe(status => {
      this.Status = status;
    });
  }
  @ViewChild('clientForm') clientForm!: NgForm;
  addClient(): void {
    // Vérifiez si le formulaire est valide et si l'email est valide s'il est fourni
    if (this.clientForm && !this.clientForm.valid || (this.newClient.email && !this.isValidEmail(this.newClient.email))) {
      return; // Ne pas soumettre le formulaire si les conditions ne sont pas remplies
    }
  
    if (!this.isAdding) {
      this.isAdding = true;
      this.clientService.createClient(this.newClient).subscribe(() => {
        // Redirection ou autres actions après l'ajout du client
        this.router.navigate(['/client']);
        this.closeModal();
        window.location.reload();
        this.isAdding = false;
      }, error => {
        this.isAdding = false;
        // Gestion des erreurs ou affichage des messages d'erreur
      });
    }
  }
  
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email ? emailRegex.test(email) : true;
  }  
}