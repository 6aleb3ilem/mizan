import { Component, OnInit, Input } from '@angular/core';
import { ProfessionService } from '../profession.service';
import { Profession } from '../profession';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdateprofession',
  templateUrl: './modalupdateprofession.component.html',
  styleUrls: ['./modalupdateprofession.component.css']
})
export class ModalupdateprofessionComponent {
  @Input() updatedProfession: Profession | null = { id: 0, label: ''};


  constructor(private router: Router, private professionService: ProfessionService) {}

  ngOnInit() {
    // Subscribe to changes in selectedProfessionId and update the form fields accordingly
    this.professionService.selectedProfessionId$.subscribe((professionId) => {
      if (professionId) {
        this.professionService.getProfessionById(professionId).subscribe(profession => {
          this.updatedProfession = profession;
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

  updateProfession() {
    if (this.professionService.selectedProfessionId && this.updatedProfession) {
      this.professionService.updateProfession(this.professionService.selectedProfessionId, this.updatedProfession).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Profession:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedProfessionId or updatedProfession is null');
      // Handle the error if selectedProfessionId or updatedProfession is null
    }
  }
}
