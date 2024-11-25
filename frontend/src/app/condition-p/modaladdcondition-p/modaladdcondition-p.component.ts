import { Component } from '@angular/core';
import { conditionPService } from '../condition-p.service';
import { Router } from '@angular/router';
import { conditionP } from '../conditionP';

@Component({
  selector: 'app-modaladdcondition-p',
  templateUrl: './modaladdcondition-p.component.html',
  styleUrl: './modaladdcondition-p.component.css'
})
export class ModaladdconditionPComponent {
  isAdding: boolean = false;
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newconditionP: conditionP = {
    id:0,
    label: '' };

  constructor(private conditionpService: conditionPService, private router: Router) {}

  addconditionP(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.conditionpService.createconditionP(this.newconditionP).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du conditionP
      this.router.navigate(['/condition-p']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
