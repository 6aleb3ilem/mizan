// Exemple dans un composant Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientContactService } from './client-contact.service';
import { Clientcontact } from './clientcontact';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-client-contact',
  templateUrl: './client-contact.component.html',
  styleUrls: ['./client-contact.component.css']
})
export class ClientContactComponent implements OnInit {
  clientcontacts: Clientcontact[] = [];
  clientId!: number;


  constructor(private clientcontactService: ClientContactService,private route:ActivatedRoute) { }
  updatedclientcontact: Clientcontact | undefined;
 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.clientId = +params['id']; // Utilisez le signe '+' pour convertir en nombre si nécessaire
    if (this.clientId) {
      this.clientcontactService.getClientContactsByClientId(this.clientId).subscribe(clientcontacts => {
        this.clientcontacts = clientcontacts;
        this.dataSource.data = clientcontacts;
      this.paginatedData = this.clientcontacts.slice(0, 5); // Initial pagination setup
      });
    }
  });
}

@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  paginatedData: Clientcontact[] = [];
  dataSource = new MatTableDataSource<Clientcontact>();
  displayedColumns: string[] = ['id', 'contact', 'client','isPrincipal'];
  sortBy: string = '';
  sortDirection: string = 'asc';
  
  // Fonction pour trier les données
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le champ sélectionné
    if (sortBy === 'id') {
      this.clientcontacts.sort((a, b) => {
        if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'contact') {
      this.clientcontacts.sort((a, b) => {
        if (a.contact.name < b.contact.name) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.contact.name > b.contact.name) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'client') {
      this.clientcontacts.sort((a, b) => {
      if (a.client?.name < b.client?.name) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.client?.name > b.client?.name) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
    } 
    // Ajoutez des cas pour trier par d'autres champs si nécessaire
    else if (sortBy === 'isPrincipal') {
      this.clientcontacts.sort((a, b) => {
        if (a.isPrincipal < b.isPrincipal) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.isPrincipal > b.isPrincipal) return this.sortDirection === 'asc' ? 1 : -1;
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
    this.paginatedData = this.clientcontacts.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.clientcontacts.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.clientcontacts.filter(clientcontact => {
    return clientcontact.id.toString().includes(filterValue) || 
    clientcontact.contact.name.toLowerCase().includes(filterValue)|| 
    clientcontact.client.name.toLowerCase().includes(filterValue)|| 
    (clientcontact.isPrincipal && 'oui'.includes(filterValue.toLowerCase())) ||
    (!clientcontact.isPrincipal && 'non'.includes(filterValue.toLowerCase()));
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(clientcontact => {
    return {
      id: clientcontact.id,
      contact: clientcontact.contact.name,
      client: clientcontact.client.name,
      principal: clientcontact.isPrincipal,
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Clientcontacts');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'clientcontacts.xlsx');
}

  openImportModal(): void {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
  }
  closeModalimp() {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  loadClientContacts(): void {
    this.clientcontactService.getAllClientContacts().subscribe(clientcontacts => {
      this.clientcontacts = clientcontacts;
    });
  }
  openModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
    console.log(this.clientId)
  }
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  selectedclientcontactId: number | null = null;
  openModalUpdate(clientcontactId: number) {
    this.clientcontactService.selectedClientContactId = clientcontactId;
    this.clientcontactService.getClientContactById(clientcontactId).subscribe(clientcontact => {
        this.updatedclientcontact = clientcontact;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });console.log(this.clientcontacts)
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
  openModalDelete(clientcontactId: number) {
    this.clientcontactService.selectedClientContactId = clientcontactId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }
}
