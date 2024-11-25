//modaldeleteclientcontact.component.ts
import { Component , OnInit} from '@angular/core';
import { DevisfService } from '../devisf.service';
import { Devisf } from '../devisf';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modaldeletedevisf',
  templateUrl: './modaldeletedevisf.component.html',
  styleUrls: ['./modaldeletedevisf.component.css']
})
export class ModaldeletedevisfComponent{
  clientcontacts: Devisf[] | undefined;
  constructor(private clientcontactService: DevisfService,private router: Router) {}
  clientcontactToDeleteId: number | undefined;
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.clientcontactToDeleteId)
  }

  deleteDevisf() {
    const selecteddevisId = this.clientcontactService.selectedDevisfId;
  
    if (selecteddevisId !== null && selecteddevisId !== undefined) {
      this.clientcontactService.hastache(selecteddevisId).subscribe(hasElement => {
        if (hasElement) {
          const warningElement = document.getElementById('warningElement');
          if (warningElement) {
            warningElement.style.display = 'block';
          }         
          console.log('Il existe un élément de devis associé à cette tâche. Suppression annulée.');
          return;
        } else {
          if (typeof selecteddevisId === 'number') { // Vérification supplémentaire
            this.clientcontactService.deleteDevisf(selecteddevisId).subscribe({
              next: () => {
                console.log('Item deleted successfully');
                this.closeModalDelete(); // Close modal after deletion
                this.refreshDevisfsList(); // Refresh the list of clientcontacts
                window.location.reload();
              },  
              error: (error) => {
                console.error('Error deleting Tache:', error);
                // Handle error if necessary
              }
            });
          }
        }
      });
    }
  }
  

// Ajoutez cette méthode dans le composant clientcontact pour rafraîchir la liste des clientcontacts
refreshDevisfsList() {
  this.clientcontactService.getAllDevisfs().subscribe(clientcontacts => {
    this.clientcontacts = clientcontacts;
  });
}
}
