import { Component, OnInit, Input } from '@angular/core';
import { TacherefService } from '../tacheref.service';
import { Router } from '@angular/router';
import { tacheref } from '../tacheref';
@Component({
  selector: 'app-modalupdateT',

  templateUrl: './modalupdate.component.html',
  styleUrl: './modalupdate.component.css'
})
export class ModalupdateTComponent {







  @Input() updatedtacheref: tacheref | null = { id: 0, label: ''};


  constructor(private router: Router, private tacherefService: TacherefService) {}

  ngOnInit() {
    // Subscribe to changes in selectedUniteId and update the form fields accordingly
    this.tacherefService.selectedtacherefId$.subscribe((bctId) => {
      if (bctId) {
        this.tacherefService.gettacherefById(bctId).subscribe(tacheref => {
          this.updatedtacheref = tacheref;
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

  updatetacheref() {
    if (this.tacherefService.selectedtacherefId && this.updatedtacheref) {
      this.tacherefService.updatetacheref(this.tacherefService.selectedtacherefId, this.updatedtacheref).subscribe(() => {
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

