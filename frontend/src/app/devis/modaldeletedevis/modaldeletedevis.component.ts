import { Component } from '@angular/core';

@Component({
  selector: 'app-modaldeletedevis',
  templateUrl: './modaldeletedevis.component.html',
  styleUrls: ['./modaldeletedevis.component.css']
})
export class ModaldeletedevisComponent {
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
}
