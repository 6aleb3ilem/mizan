import { Component } from '@angular/core';

@Component({
  selector: 'app-modaladditem-tache',
  templateUrl: './modaladditem-tache.component.html',
  styleUrls: ['./modaladditem-tache.component.css']
})
export class ModaladditemTacheComponent {
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}
