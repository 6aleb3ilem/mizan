import { Component } from '@angular/core';

@Component({
  selector: 'app-modalupdatedevis',
  templateUrl: './modalupdatedevis.component.html',
  styleUrls: ['./modalupdatedevis.component.css']
})
export class ModalupdatedevisComponent {
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
}
