import { Component } from '@angular/core';
import { BCT } from '../bct';
import { Router } from '@angular/router';
import { BctService } from '../bct.service';
@Component({
  selector: 'app-modaladd',
 

  templateUrl: './modaladd.component.html',
  styleUrl: './modaladd.component.css'
})
export class ModaladdComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newBCT: BCT = {
    id:0,
    label: '' };

  constructor(private bctService: BctService, private router: Router) {}

  addBCT(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.bctService.createBCT(this.newBCT).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Unite
      this.router.navigate(['/bcts']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
