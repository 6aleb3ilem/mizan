import { Component, OnInit, Input } from '@angular/core';
import { StatusService } from '../status.service';
import { Status } from '../status';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdatestatus',
  templateUrl: './modalupdatestatus.component.html',
  styleUrls: ['./modalupdatestatus.component.css']
})
export class ModalupdatestatusComponent {
  @Input() updatedStatus: Status | null = {  id:0,
    label: '' ,tableref:''};

    selectedTable: string = '';

  constructor(private router: Router, private statusService: StatusService) {}

  ngOnInit() {
    // Subscribe to changes in selectedStatusId and update the form fields accordingly
    this.statusService.selectedStatusId$.subscribe((statusId) => {
      if (statusId) {
        this.statusService.getStatusById(statusId).subscribe(status => {
          this.updatedStatus = status;
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

  updateStatus() {
    if (this.statusService.selectedStatusId && this.updatedStatus) {
      this.updatedStatus.tableref = this.selectedTable; // Utilisez la valeur sélectionnée
      this.statusService.updateStatus(this.statusService.selectedStatusId, this.updatedStatus).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Status:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedStatusId or updatedStatus is null');
      // Handle the error if selectedStatusId or updatedStatus is null
    }
  }
}
