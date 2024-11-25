// unite.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { BCT } from './bct';
import { BctService } from './bct.service';
import { ModaladdComponent } from './modaladd/modaladd.component';
@Component({
  selector: 'app-bct',
  templateUrl: './bct.component.html',
  styleUrls: ['./bct.component.css']
})
export class BctComponent implements OnInit{
  bctIdToUpdate: number | undefined;
  filteredData: BCT[] = [];
  bcts: BCT[] = [];
  paginatedData: BCT[] = [];
  updatedbct: BCT | undefined;
  arrayBuffer: any;
  file!: File;
   // Injectez le service Router ici
    constructor(private bctService: BctService,  private router: Router,public dialog: MatDialog) {
    
  }

  dataSource = new MatTableDataSource<BCT>();
  displayedColumns: string[] = ['id', 'label','action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


  ngOnInit(): void {
    this.bctService.getAllBCTs().subscribe(bcts => {
      this.bcts = bcts;
      this.dataSource.data = bcts;
      this.paginatedData = this.bcts.slice(0, 5); // Initial pagination setup
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.bcts.slice(startIndex, endIndex);
  }
// Ajoutez ces propriétés pour gérer le tri
sortBy: string = '';
sortDirection: string = 'asc';

sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le critère sélectionné (ID ou libellé)
  if (sortBy === 'id') {
    this.bcts.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'label') {
    this.bcts.sort((a, b) => {
      if (a.label < b.label) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.label > b.label) return this.sortDirection === 'asc' ? 1 : -1;
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
  this.paginatedData = this.bcts.slice(startIndex, endIndex);
}


  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

exportData(): void {
  // Implémentez la logique pour exporter des données vers un fichier Excel
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  XLSX.writeFile(wb, 'bct_data.xlsx');
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.bcts.filter(bct => {
    return bct.id.toString().includes(filterValue) || bct.label.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
  // openImportDialog(): void {
  //   const dialogRef = this.dialog.open(ImportModalComponent, {
  //     width: '300px',
  //     // Vous pouvez passer des données au dialogue si nécessaire
  //     // data: { name: this.name, animal: this.animal }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('La boîte de dialogue d\'importation a été fermée');
  //     // Vous pouvez traiter les données résultantes ici
  //   });
  // }
  selecteduniteId: number | null = null;
  
  openModalDelete(id: number) {
    this.bctService.selectedBCTId = id;
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
  openModalUpdate(id: number) {
    this.bctService.selectedBCTId = id;
    this.bctService.getBCTById(id).subscribe(label => {
        this.updatedbct = label;
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

}
