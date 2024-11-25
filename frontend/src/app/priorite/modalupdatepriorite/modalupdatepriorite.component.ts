import { Component, OnInit, Input } from '@angular/core';
import { PrioriteService } from '../priorite.service';
import { Priorite } from '../priorite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdatepriorite',
  templateUrl: './modalupdatepriorite.component.html',
  styleUrls: ['./modalupdatepriorite.component.css']
})
export class ModalupdateprioriteComponent {
  @Input() updatedPriorite: Priorite | null = { id: 0, label: ''};


  constructor(private router: Router, private prioriteService: PrioriteService) {}

  ngOnInit() {
    // Subscribe to changes in selectedPrioriteId and update the form fields accordingly
    this.prioriteService.selectedPrioriteId$.subscribe((prioriteId) => {
      if (prioriteId) {
        this.prioriteService.getPrioriteById(prioriteId).subscribe(priorite => {
          this.updatedPriorite = priorite;
        });
      }
    });
  }

  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }

  updatePriorite() {
    if (this.prioriteService.selectedPrioriteId && this.updatedPriorite) {
      this.prioriteService.updatePriorite(this.prioriteService.selectedPrioriteId, this.updatedPriorite).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Priorite:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedPrioriteId or updatedPriorite is null');
      // Handle the error if selectedPrioriteId or updatedPriorite is null
    }
  }
}
