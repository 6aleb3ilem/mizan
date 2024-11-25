//modaldeleteconditionP.component.ts
import { Component , OnInit} from '@angular/core';
import { conditionPService } from '../condition-p.service';
import { conditionP } from '../conditionP';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Contact } from 'src/app/contact/contact';
@Component({
  selector: 'app-modaldeletecondition-p',
  templateUrl: './modaldeletecondition-p.component.html',
  styleUrl: './modaldeletecondition-p.component.css'
})
export class ModaldeleteconditionPComponent {

  constructor(private conditionpService: conditionPService,private router: Router) {}
  conditionpToDeleteId: number | undefined;

  contact: Contact[] = [];
  ngOnInit(): void {
    forkJoin({
      contact: this.conditionpService.getAllContacts().pipe(take(1))
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
    console.log(this.conditionpToDeleteId)
  }

  deleteconditionP() {
    if (this.conditionpService.selectedconditionPId) {
      let elementId = this.conditionpService.selectedconditionPId;

      // if (elementId !== null) {
      //   // console.log('contact:', this.contact);
    
      //   const hasItem = this.contact.some(contact => contact.conditionp && contact.conditionp.id === elementId);
    
      //   // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
      //   // debugger;
    
      //   if (hasItem) {
      //     const warningcontact = document.getElementById('warningElement');
      //     console.log('contact:', this.contact);
      //     if (warningcontact) {
      //       console.log('contact:', this.contact);
      //       warningcontact.style.display = 'block';
      //     }
      //     return; // Stopper la suppression car un contact ou un contact est associé à cet élément
      //   } else {
      this.conditionpService.deleteconditionPById({ id: this.conditionpService.selectedconditionPId }).subscribe({
        next: () => {
          console.log('conditionP deleted successfully');
          window.location.reload();
          // Code pour rafraîchir la liste ou naviguer vers une autre page
        },
        error: (error) => {
          console.error('Error deleting conditionP:', error);
          // Afficher une notification d'erreur ou un message à l'utilisateur
        }
      });
    // }
    // }
    }
    this.closeModalDelete(); // Close modal after deletion
    
  }
  
  
}
