import { Component } from '@angular/core';
import { UserservicesService } from '../userservices.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Tarif } from 'src/app/tarif/tarif';
@Component({
  selector: 'app-modaldeleteuser',
  templateUrl: './modaldelete.component.html',
  styleUrl: './modaldelete.component.css'
})
export class ModaldeleteuserComponent {
// Change UserservicesService to public so it can be accessed in the template
constructor(public UserservicesService: UserservicesService, private router: Router) {}

closeModalDelete() {
  const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
  if (modalBackgrounddelete) {
    modalBackgrounddelete.style.display = 'none';
  }
  console.log(this.UserservicesService.selectedUsermanegementId); // Now this uses the public service
}

deleteUsermanegement() {
  if (this.UserservicesService.selectedUsermanegementId) {
    let elementId = this.UserservicesService.selectedUsermanegementId;

    if (elementId !== null) {
      // console.log('tarif:', this.tarif);

      // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
      // debugger;
  
      
      this.UserservicesService.deleteUser(elementId).subscribe({
        next: () => {
        console.log('Usermanegement deleted successfully');
        // Ici, vous pouvez mettre à jour l'affichage ou naviguer vers une autre route
        // par exemple, rafraîchir la liste des unités
        this.router.navigate(['/usermanegement']).then(() => {
          window.location.reload();
        });
      },
      error: (error) => {
        console.error('Error deleting Usermanegement:', error);
        // Afficher un message d'erreur à l'utilisateur
      }
    });}
  } else {
    console.log('No Usermanegement ID selected');
  }
  this.closeModalDelete(); // Close modal after deletion
}

}
