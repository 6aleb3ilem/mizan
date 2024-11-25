import { Component, OnInit, Input } from '@angular/core';
import { BctService } from '../bct.service';
import { Router } from '@angular/router';
import { BCT } from '../bct';
@Component({
  selector: 'app-modalupdate',

  templateUrl: './modalupdate.component.html',
  styleUrl: './modalupdate.component.css'
})
export class ModalupdateComponent {







  @Input() updatedbct: BCT | null = { id: 0, label: ''};


  constructor(private router: Router, private bctService: BctService) {}

  ngOnInit() {
    // Subscribe to changes in selectedUniteId and update the form fields accordingly
    this.bctService.selectedBCTId$.subscribe((bctId) => {
      if (bctId) {
        this.bctService.getBCTById(bctId).subscribe(unite => {
          this.updatedbct = unite;
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

  updateBCT() {
    if (this.bctService.selectedBCTId && this.updatedbct) {
      this.bctService.updateBCT(this.bctService.selectedBCTId, this.updatedbct).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Unite:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selecteduniteId or updatedunite is null');
      // Handle the error if selecteduniteId or updatedunite is null
    }
  }
}

