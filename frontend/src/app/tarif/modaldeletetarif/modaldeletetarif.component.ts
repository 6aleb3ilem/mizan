//modaldeleteTarif.component.ts
import { Component , OnInit} from '@angular/core';
import { TarifService } from '../tarif.service';
import { Tarif } from '../tarif';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modaldeletetarif',
  templateUrl: './modaldeletetarif.component.html',
  styleUrls: ['./modaldeletetarif.component.css']
})
export class ModaldeletetarifComponent{
  tarifs: Tarif[] | undefined;
  constructor(private tarifService: TarifService,private router: Router) {}
  tarifToDeleteId: number | undefined;
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.tarifToDeleteId)
  }

  deleteTarif() {
  if (this.tarifService.selectedTarifId) {
    this.tarifService.deleteTarif(this.tarifService.selectedTarifId).subscribe({
      next: () => {
        console.log('Tarif deleted successfully');
        this.refreshTarifsList();
        window.location.reload();

      },
      error: (error) => {
        console.error('Error deleting Tarif:', error);
      }
    });
  }
  this.closeModalDelete();
  
}

// Ajoutez cette méthode dans le composant Tarif pour rafraîchir la liste des tarifs
refreshTarifsList() {
  this.tarifService.getAllTarifs().subscribe(tarifs => {
    this.tarifs = tarifs;
  });
}
}
