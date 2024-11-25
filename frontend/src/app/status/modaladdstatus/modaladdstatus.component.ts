import { Component } from '@angular/core';
import { StatusService } from '../status.service';
import { Router } from '@angular/router';
import { Status } from '../status';

@Component({
  selector: 'app-modaladdstatus',
  templateUrl: './modaladdstatus.component.html',
  styleUrls: ['./modaladdstatus.component.css']
})
export class ModaladdstatusComponent {
  isAdding: boolean = false;
  selectedTable: string = '';
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newStatus: Status = {
    id:0,
    label: '' ,tableref:''};

  constructor(private statusService: StatusService, private router: Router) {}

  addStatus(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.newStatus.tableref = this.selectedTable; // Utilisez la valeur sélectionnée
      this.statusService.createStatus(this.newStatus).subscribe(() => {
      // Redirigez ou effectuez toute autre action après l'ajout du Status
      this.router.navigate(['/status']);
      this.closeModal();
      window.location.reload();
      this.isAdding = false;
    });
  }}
}
