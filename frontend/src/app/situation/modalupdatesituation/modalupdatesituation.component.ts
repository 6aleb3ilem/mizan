import { Component, OnInit, Input } from '@angular/core';
import { SituationService } from '../situation.service';
import { Situation } from '../situation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdatesituation',
  templateUrl: './modalupdatesituation.component.html',
  styleUrls: ['./modalupdatesituation.component.css']
})
export class ModalupdatesituationComponent {
  @Input() updatedSituation: Situation | null = { id: 0, label: ''};


  constructor(private router: Router, private situationService: SituationService) {}

  ngOnInit() {
    // Subscribe to changes in selectedSituationId and update the form fields accordingly
    this.situationService.selectedSituationId$.subscribe((situationId) => {
      if (situationId) {
        this.situationService.getSituationById(situationId).subscribe(situation => {
          this.updatedSituation = situation;
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

  updateSituation() {
    if (this.situationService.selectedSituationId && this.updatedSituation) {
      this.situationService.updateSituation(this.situationService.selectedSituationId, this.updatedSituation).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Situation:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedSituationId or updatedSituation is null');
      // Handle the error if selectedSituationId or updatedSituation is null
    }
  }
}
