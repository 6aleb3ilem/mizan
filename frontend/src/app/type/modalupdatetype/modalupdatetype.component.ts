import { Component, OnInit, Input } from '@angular/core';
import { TypeService } from '../type.service';
import { Type } from '../type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdatetype',
  templateUrl: './modalupdatetype.component.html',
  styleUrls: ['./modalupdatetype.component.css']
})
export class ModalupdatetypeComponent {
  @Input() updatedType: Type | null = { id_type: 0, label: ''};


  constructor(private router: Router, private typeService: TypeService) {}

  ngOnInit() {
    // Subscribe to changes in selectedTypeId and update the form fields accordingly
    this.typeService.selectedTypeId$.subscribe((typeId) => {
      if (typeId) {
        this.typeService.getTypeById(typeId).subscribe(type => {
          this.updatedType = type;
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

  updateType() {
    if (this.typeService.selectedTypeId && this.updatedType) {
      this.typeService.updateType(this.typeService.selectedTypeId, this.updatedType).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Type:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedTypeId or updatedType is null');
      // Handle the error if selectedTypeId or updatedType is null
    }
  }
}
