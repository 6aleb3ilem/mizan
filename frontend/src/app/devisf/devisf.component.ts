// Exemple dans un composant Angular
import { DevisfService } from './devisf.service';
import { Devisf } from './devisf';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-devisf',
  templateUrl: './devisf.component.html',
  styleUrls: ['./devisf.component.css']
})
export class DevisfComponent implements OnInit {
  devisf: Devisf[] = [];
  projectId!: number;
  clientName!: string;
  projectName!: string;

  constructor(private DevisfService: DevisfService,private route:ActivatedRoute) { }
  updatedDevisf: Devisf | undefined;
  selectedDevisfId: number | null = null;
  selectedDevisId: number | null = null;
 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.projectId = +params['projectId']; // Utilisez le signe '+' pour convertir en nombre si nécessaire
    this.clientName = params['clientName'];
    this.projectName = params['projectName'];

    if (this.projectId) {
      this.DevisfService.getDevisfsByProjectId(this.projectId).subscribe(devisf => {
        this.devisf = devisf;
        this.dataSource.data = devisf;
      this.paginatedData = this.devisf.slice(0, 5); 
      });
    }
  });
}
  loadDevisfs(): void {
    this.DevisfService.getAllDevisfs().subscribe(devisf => {
      this.devisf = devisf;
    });
  }
  paginatedData: Devisf[] = [];
  dataSource = new MatTableDataSource<Devisf>();
  displayedColumns: string[] = ['devisId', 'discount', 'date','discountp','status','note'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
// Dans votre composant DevisfComponent

// Ajoutez ces propriétés pour gérer le tri
sortBy: string = ''; // champ par lequel trier
sortDirection: string = 'asc'; // direction de tri

// Fonction pour trier les données
sortData(sortBy: string) {
  this.sortBy = sortBy; // Mettre à jour le champ de tri actuel
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'; // Changer la direction du tri à chaque clic

  // Tri des données en fonction du champ sélectionné
  if (sortBy === 'devisId' || sortBy === 'discount' || sortBy === 'date' || sortBy === 'discountp' || sortBy === 'status' || sortBy === 'note' || sortBy === 'ref_devis' || sortBy === 'montantRemise' || sortBy === 'montantTva'|| sortBy === 'montant'  ) {
    this.devisf.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return this.sortDirection === 'asc' ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } 

  // Mise à jour des données paginées après le tri
  this.paginateData();
}
openModalDupplicate(devisId: number) {
  this.selectedDevisId = devisId; // Stocker l'ID du devis sélectionné
  const modalBackgroundupdate = document.getElementById('modalBackgroundupplicate');
  if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'block';
  }
}closeModalDupplicate(){
    const modalBackgroundupplicate = document.getElementById('modalBackgroundupplicate');
    if (modalBackgroundupplicate) {
      modalBackgroundupplicate.style.display = 'none';
    }
  
  }
// Fonction pour paginer les données après le tri
paginateData() {
  // Réappliquer la pagination sur les données triées
  const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  const endIndex = startIndex + this.paginator.pageSize;
  this.paginatedData = this.devisf.slice(startIndex, endIndex);
}

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.devisf.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  
    // Apply filter to paginatedData
    this.paginatedData = this.devisf.filter(devisf => {
      return devisf.devisId.toString().includes(filterValue) ||
        devisf.discount.toString().includes(filterValue) ||
        (devisf.note ? devisf.note.toString().includes(filterValue) : false) ||
        devisf.date.toString().includes(filterValue) ||
        devisf.status.toString().includes(filterValue) ||
        (devisf.discountp !== null ? devisf.discountp.toString().includes(filterValue) : false);
    });
  
    // If paginator exists, reset to the first page
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(devisf => {
    return {
      id: devisf.devisId,
      date:devisf.date,
      discount: devisf.discount,
      discountp:devisf.discountp,
      status:devisf.status,
      devisf: devisf.note
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Elements');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'devisfs.xlsx');
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
  openModal(projectId: number | undefined) {
    if (projectId !== undefined) { // Vérifiez si projectId est défini
      const modalBackground = document.getElementById('modalBackground');
      if (modalBackground) {
        modalBackground.style.display = 'block';
        this.projectId = projectId;
      }}
  }
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  openModalUpdate(DevisfId: number) {
    this.DevisfService.selectedDevisfId = DevisfId;
    this.DevisfService.getDevisfById(DevisfId).subscribe(Devisf => {
        this.updatedDevisf = Devisf;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });console.log(this.devisf)
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
  openModalDelete(DevisfId: number) {
    this.DevisfService.selectedDevisfId = DevisfId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }
}
