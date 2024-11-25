// situation.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';
import { SituationService}  from './situation.service';
import { Situation } from './situation';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
// import { ImportModalComponent } from '../situation/import-modal/import-modal.component';
@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.css']
})
export class SituationComponent implements OnInit{
  situationIdToUpdate: number | undefined;
 
  situations: Situation[] = [];
  updatedsituation: Situation | undefined;
   // Injectez le service Router ici
   paginatedData: Situation[] = [];
   dataSource = new MatTableDataSource<Situation>();
   displayedColumns: string[] = ['id', 'label', 'action'];
 
   @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
 
   constructor(private situationService: SituationService, private router: Router, public dialog: MatDialog) {}
 
   ngOnInit(): void {
     this.situationService.getAllSituations().subscribe(situations => {
      this.situations = situations;
       this.dataSource.data = situations;
       this.paginatedData = this.situations.slice(0, 5); // Initial pagination setup
     });
   }
   onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.situations.slice(startIndex, endIndex);
  }
   arrayBuffer: any;
   file!: File;
 
   onFileChange(event: any) {
     this.file = event.target.files[0];
   }
 // Ajoutez ces propriétés pour gérer le tri
sortBy: string = '';
sortDirection: string = 'asc';

sortData(sortBy: string) {
  this.sortBy = sortBy;
  this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  
  // Tri des données selon le critère sélectionné (ID ou libellé)
  if (sortBy === 'id') {
    this.situations.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'label') {
    this.situations.sort((a, b) => {
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
  this.paginatedData = this.situations.slice(startIndex, endIndex);
}
 exportData(): void {
   // Implémentez la logique pour exporter des données vers un fichier Excel
   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Data');
 
   XLSX.writeFile(wb, 'situation_data.xlsx');
 }
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.situations.filter(situation => {
    return situation.id.toString().includes(filterValue) || situation.label.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
  //  openImportDialog(): void {
  //   const dialogRef = this.dialog.open(ImportModalComponent, {
  //     width: '300px',height:'165px'
  //     // Vous pouvez passer des données au dialogue si nécessaire
  //     // data: { name: this.name, animal: this.animal }
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('La boîte de dialogue d\'importation a été fermée');
  //     // Vous pouvez traiter les données résultantes ici
  //   });
  // }
  selectedsituationId: number | null = null;

  openModalDelete(situationId: number) {
    this.situationService.selectedSituationId = situationId;
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
  openModalUpdate(situationId: number) {
    this.situationService.selectedSituationId = situationId;
    this.situationService.getSituationById(situationId).subscribe(situation => {
        this.updatedsituation = situation;
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
