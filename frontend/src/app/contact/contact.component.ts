import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from './contact.service';
import { Contact } from './contact';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contactIdToUpdate: number | undefined;

  contacts: Contact[] = [];
  updatedContact: Contact | undefined;
   // Injectez le service Router ici
    constructor(private contactService: ContactService,  private authService: AuthService, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.contactService.getAllContacts().subscribe(contacts => {
      this.contacts = contacts;
      this.dataSource.data = contacts;
      this.paginatedData = this.contacts.slice(0, 5); 
    });
  }
  paginatedData: Contact[] = [];
  dataSource = new MatTableDataSource<Contact>();
  displayedColumns: string[] = ['id', 'name', 'telephone','whatsapp','email','address','profession','note'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
// Dans votre composant ContactComponent

// Ajouter des variables pour le tri
sortBy: string = '';
sortDirection: string = 'asc';

// Fonction pour trier les données
sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le champ sélectionné
  if (sortBy === 'id') {
    this.contacts.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'name') {
    this.contacts.sort((a, b) => {
      if (a.name < b.name) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.name > b.name) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'telephone') {
    this.contacts.sort((a, b) => {
    if (a.telephone < b.telephone) return this.sortDirection === 'asc' ? -1 : 1;
    if (a.telephone > b.telephone) return this.sortDirection === 'asc' ? 1 : -1;
    return 0;});
  } else if (sortBy === 'whatsapp') {
    this.contacts.sort((a, b) => {
      if (a.whatsapp < b.whatsapp) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.whatsapp > b.whatsapp) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  // Ajoutez des cas pour trier par d'autres champs si nécessaire
  else if (sortBy === 'email') {
    this.contacts.sort((a, b) => {
      if (a.email < b.email) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.email > b.email) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  else if (sortBy === 'address') {
    this.contacts.sort((a, b) => {
      if (a.address < b.address) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.address > b.address) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  else if (sortBy === 'profession') {
    this.contacts.sort((a, b) => {
      if (a.profession < b.profession) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.profession > b.profession) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;});
  }
  else if (sortBy === 'note') {
    this.contacts.sort((a, b) => {
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
  this.paginatedData = this.contacts.slice(startIndex, endIndex);
}

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.contacts.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.contacts.filter(contact => {
    return contact.id.toString().includes(filterValue) ||
     contact.name.toLowerCase().includes(filterValue)|| 
     contact.note.toLowerCase().includes(filterValue)|| 
     contact.telephone.toString().includes(filterValue)|| 
     contact.email.toLowerCase().includes(filterValue) ||
     contact.address.toLowerCase().includes(filterValue) ||
     contact.whatsapp.toString().includes(filterValue) ||
     contact.profession.toString().includes(filterValue)
     ;
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(contact => {
    return {
      id: contact.id,
      name: contact.name,
      telephone:contact.telephone,
      whatsapp:contact.whatsapp,
      email:contact.email,
      address:contact.address,
      profession:contact.profession.label,
      note: contact.note
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Elements');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'contacts.xlsx');
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
}
  selectedcontactId: number | null = null;

  openModalDelete(contactId: number) {
    this.contactService.selectedcontactId = contactId;
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
  openModalUpdate(contactId: number) {
    this.contactService.selectedcontactId = contactId;
    this.contactService.getContactById(contactId).subscribe(contact => {
        this.updatedContact = contact;
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
