//eclient.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { ClientService } from './client.service';
import { Client } from './client';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientIdToUpdate: number | undefined;

  clients: Client[] = [];
  updatedClient: Client | undefined;
   // Injectez le service Router ici
    constructor(private clientService: ClientService, private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
      this.dataSource.data = clients;
      this.paginatedData = this.clients.slice(0, 5); 
    });
  }
  paginatedData: Client[] = [];
  dataSource = new MatTableDataSource<Client>();
  displayedColumns: string[] = ['id', 'name', 'telephone','email','adress','status','note'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
// Ajouter des variables pour le tri
sortBy: string = '';
sortDirection: string = 'asc';

// Fonction pour trier les données
sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le champ sélectionné
  if (sortBy === 'id') {
    this.clients.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'name') {
    this.clients.sort((a, b) => {
      if (a.name < b.name) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.name > b.name) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'telephone') {
    this.clients.sort((a, b) => {
    if (a.telephone < b.telephone) return this.sortDirection === 'asc' ? -1 : 1;
    if (a.telephone > b.telephone) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;});
  } 
  // Ajoutez des cas pour trier par d'autres champs si nécessaire
  else if (sortBy === 'email') {
    this.clients.sort((a, b) => {
      if (a.email < b.email) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.email > b.email) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  else if (sortBy === 'address') {
    this.clients.sort((a, b) => {
      if (a.address < b.address) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.address > b.address) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  else if (sortBy === 'status') {
    this.clients.sort((a, b) => {
      if (a.status < b.status) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.status > b.status) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  else if(sortBy === 'note') {
    this.clients.sort((a, b) => {
      if (a.note < b.note) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.note > b.note) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  // Mettre à jour les données paginées après le tri
  this.paginateData();
}

// Fonction pour paginer les données
paginateData() {
  // Réappliquer la pagination sur les données triées
  const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  const endIndex = startIndex + this.paginator.pageSize;
  this.paginatedData = this.clients.slice(startIndex, endIndex);
}
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.clients.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.clients.filter(client => {
    return client.id.toString().includes(filterValue) ||
     client.name.toLowerCase().includes(filterValue)|| 
     client.note.toLowerCase().includes(filterValue)|| 
     client.telephone.toString().includes(filterValue)|| 
     client.email.toLowerCase().includes(filterValue) ||
     client.address.toLowerCase().includes(filterValue) ||
     client.status.toString().includes(filterValue) 
     ;
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(client => {
    return {
      id: client.id,
      name: client.name,
      telephone:client.telephone,
      email:client.email,
      address:client.address,
      status:client.status.label,
      note: client.note
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Elements');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'clients.xlsx');
}
openImportModal(): void {
  const modalBackground = document.getElementById('importModalBackground');
  if (modalBackground) {
    modalBackground.style.display = 'block';
  }else {
    console.error('Modal background element not found');
  }
}
closeModalimp() {
  const modalBackground = document.getElementById('importModalBackground');
  if (modalBackground) {
    modalBackground.style.display = 'none';
  }
} selectedClientId: number | null = null;

  openModalDelete(clientId: number) {
    this.clientService.selectedClientId = clientId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }

  openModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
  }

  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  openModalUpdate(clientId: number) {
    this.clientService.selectedClientId = clientId;
    this.clientService.getClientById(clientId).subscribe(client => {
        this.updatedClient = client;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });
}
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }

  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
  isAdmin(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('ADMIN') || roles.includes('SUPERADMIN');
  }
  
}
