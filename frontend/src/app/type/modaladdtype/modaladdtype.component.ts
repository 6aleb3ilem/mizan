import { Component } from '@angular/core';
import { TypeService } from '../type.service';
import { Router } from '@angular/router';
import { Type } from '../type';

@Component({
  selector: 'app-modaladdtype',
  templateUrl: './modaladdtype.component.html',
  styleUrls: ['./modaladdtype.component.css']
})
export class ModaladdtypeComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newType: Type = {
    id_type:0,
    label: '' };

  constructor(private typeService: TypeService, private router: Router) {}

  addType(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.typeService.createType(this.newType).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Type
      this.router.navigate(['/type']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
