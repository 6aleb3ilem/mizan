import { Component } from '@angular/core';

@Component({
  selector: 'app-modalupdateitem-tache',
  templateUrl: './modalupdateitem-tache.component.html',
  styleUrls: ['./modalupdateitem-tache.component.css']
})
export class ModalupdateitemTacheComponent {
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
}
