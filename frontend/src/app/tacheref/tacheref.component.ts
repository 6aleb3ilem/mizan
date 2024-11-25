import { Tache } from './../tache/tache';
// unite.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';

import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { MatDialog } from '@angular/material/dialog';
import { TacheService } from '../tache/tache.service';
import { TacherefService} from './tacheref.service';
import { tacheref } from './tacheref';
@Component({
  selector: 'app-tacheref',
  templateUrl: './tacheref.component.html',
  styleUrls: ['./tacheref.component.css']
})
export class TacherefComponent implements OnInit{
 tacherefIdToUpdate: number | undefined;
  filteredData: tacheref[] = [];
  tacherefs: tacheref[] = [];
  paginatedData: tacheref[] = [];
  updatedtacheref: tacheref | undefined;
  deletedtacheref: tacheref | undefined;

  arrayBuffer: any;
  file!: File;
   // Injectez le service Router ici
    constructor(private tacherefService: TacherefService,  private router: Router,public dialog: MatDialog) {
    
  }

  dataSource = new MatTableDataSource<tacheref>();
  displayedColumns: string[] = ['id', 'label','action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


  ngOnInit(): void {
    this.tacherefService.getAlltacherefs().subscribe(tacherefs => {
      this.tacherefs = tacherefs;
      this.dataSource.data = tacherefs;
      this.paginatedData = this.tacherefs.slice(0, 5); // Initial pagination setup
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.tacherefs.slice(startIndex, endIndex);
  }
// Ajoutez ces propriétés pour gérer le tri
sortBy: string = '';
sortDirection: string = 'asc';

sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le critère sélectionné (ID ou libellé)
  if (sortBy === 'id') {
    this.tacherefs.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'label') {
    this.tacherefs.sort((a, b) => {
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
  this.paginatedData = this.tacherefs.slice(startIndex, endIndex);
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
  this.paginatedData = this.tacherefs.filter(tacheref => {
    return tacheref.id.toString().includes(filterValue) || tacheref.label.toLowerCase().includes(filterValue);
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
  selectedtacherefId: number | null = null;
  
  openModalDelete(id: number) {
    this.tacherefService.selectedtacherefId = id;
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
    this.tacherefService.selectedtacherefId = id;
    this.tacherefService.gettacherefById(id).subscribe(label => {
        this.updatedtacheref = label;
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
