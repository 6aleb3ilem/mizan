import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modalupdateclient',
  templateUrl: './modalupdateclient.component.html',
  styleUrls: ['./modalupdateclient.component.css']
})
export class ModalupdateclientComponent implements OnInit {
  @Input() updatedClient: Client | null = { id: 0, name: '', telephone: '', email: '', address: '', status: {id:0,label:'',tableref:''},
 note: '', contacts: [] };

 Status: any[] = [];

  constructor(private router: Router, private clientService: ClientService) {}

  ngOnInit() {
    // Subscribe to changes in selectedClientId and update the form fields accordingly
    this.clientService.selectedClientId$.subscribe((clientId) => {
      if (clientId) {
        this.clientService.getClientById(clientId).subscribe(client => {
          this.updatedClient = client;
        });
      }
    });
    this.clientService.getAllStatuss().subscribe(status => {
      this.Status = status;
    });
  }
  
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }

  updateClient() {
    if (this.clientService.selectedClientId && this.updatedClient) {
      this.clientService.updateClient(this.clientService.selectedClientId, this.updatedClient).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating client:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedClientId or updatedClient is null');
      // Handle the error if selectedClientId or updatedClient is null
    }
  }
}
