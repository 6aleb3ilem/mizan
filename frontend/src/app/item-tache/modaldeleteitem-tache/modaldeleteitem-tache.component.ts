import { Component } from '@angular/core';

@Component({
  selector: 'app-modaldeleteitem-tache',
  templateUrl: './modaldeleteitem-tache.component.html',
  styleUrls: ['./modaldeleteitem-tache.component.css']
})
export class ModaldeleteitemTacheComponent {
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
}
