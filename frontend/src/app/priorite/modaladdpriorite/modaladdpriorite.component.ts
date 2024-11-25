import { Component } from '@angular/core';
import { PrioriteService } from '../priorite.service';
import { Router } from '@angular/router';
import { Priorite } from '../priorite';

@Component({
  selector: 'app-modaladdpriorite',
  templateUrl: './modaladdpriorite.component.html',
  styleUrls: ['./modaladdpriorite.component.css']
})
export class ModaladdprioriteComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newPriorite: Priorite = {
    id:0,
    label: '' };

  constructor(private prioriteService: PrioriteService, private router: Router) {}

  addPriorite(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.prioriteService.createPriorite(this.newPriorite).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Priorite
      this.router.navigate(['/priorite']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
