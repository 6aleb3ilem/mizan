import { Component, OnInit, Input } from '@angular/core';
import { UniteService } from '../unite.service';
import { Unite } from '../unite';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdateunite',
  templateUrl: './modalupdateunite.component.html',
  styleUrls: ['./modalupdateunite.component.css']
})
export class ModalupdateuniteComponent {
  @Input() updatedUnite: Unite | null = { id: 0, unite: ''};


  constructor(private router: Router, private uniteService: UniteService) {}

  ngOnInit() {
    // Subscribe to changes in selectedUniteId and update the form fields accordingly
    this.uniteService.selectedUniteId$.subscribe((uniteId) => {
      if (uniteId) {
        this.uniteService.getUniteById(uniteId).subscribe(unite => {
          this.updatedUnite = unite;
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

  updateUnite() {
    if (this.uniteService.selectedUniteId && this.updatedUnite) {
      this.uniteService.updateUnite(this.uniteService.selectedUniteId, this.updatedUnite).subscribe(() => {
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
