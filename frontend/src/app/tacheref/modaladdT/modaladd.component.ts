import { Component } from '@angular/core';
import { tacheref } from '../tacheref';
import { Router } from '@angular/router';
import { TacherefService } from '../tacheref.service';
@Component({
  selector: 'app-modaladdT',
 

  templateUrl: './modaladd.component.html',
  styleUrl: './modaladd.component.css'
})
export class ModaladdTComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newtacheref: tacheref = {
    id:0,
    label: '' };

  constructor(private tacherefService: TacherefService, private router: Router) {}

  addtacheref(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.tacherefService.createtacheref(this.newtacheref).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Unite
      this.router.navigate(['/tacheref']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
