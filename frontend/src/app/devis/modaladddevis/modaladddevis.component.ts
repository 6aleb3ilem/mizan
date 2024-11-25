import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modaladddevis',
  templateUrl: './modaladddevis.component.html',
  styleUrls: ['./modaladddevis.component.css']
})
export class ModaladddevisComponent  implements OnInit{
  ngOnInit() {
    console.log('Le composant ModaladddevisComponent a été initialisé');

    this.updateFieldStatus(); // Appel de test
  }
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  devisMontant: string = '';
  remise: string = '';
  disableDevisMontant: boolean = false;
  disableRemise: boolean = false;

  updateFieldStatus(): void {
    console.log('Devis Montant:', this.devisMontant, 'Disable Remise:', this.disableRemise);
    console.log('Remise:', this.remise, 'Disable Devis Montant:', this.disableDevisMontant);
  
    this.disableRemise = this.devisMontant !== '';
    this.disableDevisMontant = this.remise !== '';
  }
  
}
