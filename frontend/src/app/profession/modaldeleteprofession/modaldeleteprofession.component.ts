//modaldeleteProfession.component.ts
import { Component , OnInit} from '@angular/core';
import { ProfessionService } from '../profession.service';
import { Profession } from '../profession';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/contact/contact';
@Component({
  selector: 'app-modaldeleteprofession',
  templateUrl: './modaldeleteprofession.component.html',
  styleUrls: ['./modaldeleteprofession.component.css']
})
export class ModaldeleteprofessionComponent{
  constructor(private professionService: ProfessionService,private router: Router) {}
  professionToDeleteId: number | undefined;

  contact: Contact[] = [];
  ngOnInit(): void {
    forkJoin({
      contact: this.professionService.getAllContacts().pipe(take(1))
    }).subscribe(({ contact }) => {
      this.contact = contact;
      console.log('contact:', this.contact);
    });
  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.professionToDeleteId)
  }

  deleteProfession() {
    if (this.professionService.selectedProfessionId) {
      let elementId = this.professionService.selectedProfessionId;

      if (elementId !== null) {
        // console.log('contact:', this.contact);
    
        const hasItem = this.contact.some(contact => contact.profession && contact.profession.id === elementId);
    
        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasItem) {
          const warningcontact = document.getElementById('warningElement');
          console.log('contact:', this.contact);
          if (warningcontact) {
            console.log('contact:', this.contact);
            warningcontact.style.display = 'block';
          }
          return; // Stopper la suppression car un contact ou un contact est associé à cet élément
        } else {
      this.professionService.deleteProfessionById({ id: this.professionService.selectedProfessionId }).subscribe({
        next: () => {
          console.log('Profession deleted successfully');
          window.location.reload();
          // Code pour rafraîchir la liste ou naviguer vers une autre page
        },
        error: (error) => {
          console.error('Error deleting Profession:', error);
          // Afficher une notification d'erreur ou un message à l'utilisateur
        }
      });}}
    }
    this.closeModalDelete(); // Close modal after deletion
    
  }
  
  
}
