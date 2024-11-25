// usermanegement.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';
import { UserservicesService}  from './userservices.service';
import { Usermanegement } from './usermanegement';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../login/auth.service';

@Component({
  selector: 'app-usermanegement',
  templateUrl: './usermanegement.component.html',
  styleUrl: './usermanegement.component.css'
})
export class UsermanegementComponent {
  usermanegementIdToUpdate: number | undefined;
  filteredData: Usermanegement[] = [];
  usermanegements: Usermanegement[] = [];
  paginatedData: Usermanegement[] = [];
  updatedusermanegement: Usermanegement | undefined;
  arrayBuffer: any;
  file!: File;
   // Injectez le service Router ici
   constructor(private usermanegementService: UserservicesService, private router: Router, public dialog: MatDialog, private authService: AuthService) { }

  isSuperAdmin: boolean = false;

  dataSource = new MatTableDataSource<Usermanegement>();
  displayedColumns: string[] = ['id', 'usermanegement','action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


  ngOnInit(): void {
    this.isSuperAdmin = this.authService.isSuperAdmin();
    this.usermanegementService.getAllUsers().subscribe(Usermanegement => {
      this.usermanegements = Usermanegement;
      this.filterUsersBasedOnRole();
      this.dataSource.data = this.filteredData;
      this.paginatedData = this.filteredData.slice(0, 5); // Initial pagination setup
    });
  }
  filterUsersBasedOnRole() {
    if (this.isSuperAdmin) {
      this.filteredData = this.usermanegements; // SuperAdmin sees all users
    } else {
      this.filteredData = this.usermanegements.filter(user => user.role !== 'ADMIN' && user.role !== 'SUPERADMIN');
    }
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.usermanegements.slice(startIndex, endIndex);
  }
// Ajoutez ces propriétés pour gérer le tri
sortBy: string = '';
sortDirection: string = 'asc';

sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le critère sélectionné (ID ou libellé)
  if (sortBy === 'id') {
    this.usermanegements.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'usermanegement') {
    this.usermanegements.sort((a, b) => {
      if (a.name < b.name) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.name > b.name) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Mise à jour des données paginées après le tri
  this.paginateData();
}

paginateData() {
  // Réappliquer la pagination sur les données triées
  const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  const endIndex = startIndex + this.paginator.pageSize;
  this.paginatedData = this.usermanegements.slice(startIndex, endIndex);
}


  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

exportData(): void {
  // Implémentez la logique pour exporter des données vers un fichier Excel
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  XLSX.writeFile(wb, 'usermanegement_data.xlsx');
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.usermanegements.filter(usermanegement => {
    return usermanegement.id.toString().includes(filterValue) || usermanegement.name.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
 
  selectedusermanegementId: number | null = null;
  
  openModalDelete(usermanegementId: number) {
    this.usermanegementService.selectedUsermanegementId = usermanegementId;
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
  closeModalimp() {
    const modalBackground = document.getElementById('modalBackgroundimp');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  openModalUpdate(usermanegementId: number) {
    this.usermanegementService.selectedUsermanegementId = usermanegementId;
    this.usermanegementService.getUserById(usermanegementId).subscribe(usermanegement => {
      this.usermanegementService.setSelectedUsermanegement(usermanegement);
      const modalBackgroundUpdate = document.getElementById('modalBackgroundupdate');
      if (modalBackgroundUpdate) {
        modalBackgroundUpdate.style.display = 'block';
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

}
