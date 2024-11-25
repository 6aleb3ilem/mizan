import { Component } from '@angular/core';
import { SituationService } from '../situation.service';
import { Router } from '@angular/router';
import { Situation } from '../situation';

@Component({
  selector: 'app-modaladdsituation',
  templateUrl: './modaladdsituation.component.html',
  styleUrls: ['./modaladdsituation.component.css']
})
export class ModaladdsituationComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newSituation: Situation = {
    id:0,
    label: '' };

  constructor(private situationService: SituationService, private router: Router) {}

  addSituation(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.situationService.createSituation(this.newSituation).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Situation
      this.router.navigate(['/situation']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
