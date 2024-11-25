import { Component } from '@angular/core';
import { ProfessionService } from '../profession.service';
import { Router } from '@angular/router';
import { Profession } from '../profession';

@Component({
  selector: 'app-modaladdprofession',
  templateUrl: './modaladdprofession.component.html',
  styleUrls: ['./modaladdprofession.component.css']
})
export class ModaladdprofessionComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newProfession: Profession = {
    id:0,
    label: '' };

  constructor(private professionService: ProfessionService, private router: Router) {}

  addProfession(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.professionService.createProfession(this.newProfession).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Profession
      this.router.navigate(['/profession']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
