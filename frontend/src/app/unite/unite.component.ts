// unite.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';
import { UniteService}  from './unite.service';
import { Unite } from './unite';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { ImportModalComponent } from './import-modal/import-modal.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-unite',
  templateUrl: './unite.component.html',
  styleUrls: ['./unite.component.css']
})
export class UniteComponent implements OnInit{
  uniteIdToUpdate: number | undefined;
  filteredData: Unite[] = [];
  unites: Unite[] = [];
  paginatedData: Unite[] = [];
  updatedunite: Unite | undefined;
  arrayBuffer: any;
  file!: File;
   // Injectez le service Router ici
    constructor(private uniteService: UniteService,  private router: Router,public dialog: MatDialog) {
    
  }

  dataSource = new MatTableDataSource<Unite>();
  displayedColumns: string[] = ['id', 'unite','action'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;


  ngOnInit(): void {
    this.uniteService.getAllUnites().subscribe(unites => {
      this.unites = unites;
      this.dataSource.data = unites;
      this.paginatedData = this.unites.slice(0, 5); // Initial pagination setup
    });
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.unites.slice(startIndex, endIndex);
  }
// Ajoutez ces propriétés pour gérer le tri
sortBy: string = '';
sortDirection: string = 'asc';

sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le critère sélectionné (ID ou libellé)
  if (sortBy === 'id') {
    this.unites.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'unite') {
    this.unites.sort((a, b) => {
      if (a.unite < b.unite) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.unite > b.unite) return this.sortDirection === 'asc' ? 1 : -1;
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
  this.paginatedData = this.unites.slice(startIndex, endIndex);
}


  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

exportData(): void {
  // Implémentez la logique pour exporter des données vers un fichier Excel
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  XLSX.writeFile(wb, 'unite_data.xlsx');
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.unites.filter(unite => {
    return unite.id.toString().includes(filterValue) || unite.unite.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
  openImportDialog(): void {
    const dialogRef = this.dialog.open(ImportModalComponent, {
      width: '300px',
      // Vous pouvez passer des données au dialogue si nécessaire
      // data: { name: this.name, animal: this.animal }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('La boîte de dialogue d\'importation a été fermée');
      // Vous pouvez traiter les données résultantes ici
    });
  }
  selecteduniteId: number | null = null;
  
  openModalDelete(uniteId: number) {
    this.uniteService.selectedUniteId = uniteId;
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
  openModalUpdate(uniteId: number) {
    this.uniteService.selectedUniteId = uniteId;
    this.uniteService.getUniteById(uniteId).subscribe(unite => {
        this.updatedunite = unite;
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
