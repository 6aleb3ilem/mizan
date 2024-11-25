import { Component } from '@angular/core';
import { UniteService } from '../unite.service';
import { Router } from '@angular/router';
import { Unite } from '../unite';

@Component({
  selector: 'app-modaladdunite',
  templateUrl: './modaladdunite.component.html',
  styleUrls: ['./modaladdunite.component.css']
})
export class ModaladduniteComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newUnite: Unite = {
    id:0,
    unite: '' };

  constructor(private uniteService: UniteService, private router: Router) {}

  addUnite(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.uniteService.createUnite(this.newUnite).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Unite
      this.router.navigate(['/unite']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
