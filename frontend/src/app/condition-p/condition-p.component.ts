// conditionp.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';
import { conditionPService}  from './condition-p.service';
import { conditionP } from './conditionP';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';
// import { ImportModalComponent } from '../conditionp/import-modal/import-modal.component';
@Component({
  selector: 'app-condition-p',
  templateUrl: './condition-p.component.html',
  styleUrl: './condition-p.component.css'
}) 
export class ConditionPComponent {
  conditionpIdToUpdate: number | undefined;
 
  conditionps: conditionP[] = [];
  updatedconditionp: conditionP | undefined;
   // Injectez le service Router ici
   paginatedData: conditionP[] = [];
   dataSource = new MatTableDataSource<conditionP>();
   displayedColumns: string[] = ['id', 'label', 'action'];
 
   @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
 
   constructor(private conditionpService: conditionPService, private router: Router, public dialog: MatDialog) {}
 
   ngOnInit(): void {
     this.conditionpService.getAllconditionPs().subscribe(conditionps => {
      this.conditionps = conditionps;
       this.dataSource.data = conditionps;
       this.paginatedData = this.conditionps.slice(0, 5); // Initial pagination setup
     });
   }
   onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.conditionps.slice(startIndex, endIndex);
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
    this.conditionps.sort((a, b) => {
      if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  } else if (sortBy === 'label') {
    this.conditionps.sort((a, b) => {
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
  this.paginatedData = this.conditionps.slice(startIndex, endIndex);
}
 exportData(): void {
   // Implémentez la logique pour exporter des données vers un fichier Excel
   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
   const wb: XLSX.WorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(wb, ws, 'Data');
 
   XLSX.writeFile(wb, 'conditionp_data.xlsx');
 }
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.conditionps.filter(conditionp => {
    return conditionp.id.toString().includes(filterValue) || conditionp.label.toLowerCase().includes(filterValue);
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
  selectedconditionpId: number | null = null;

  openModalDelete(conditionpId: number) {
    this.conditionpService.selectedconditionPId = conditionpId;
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
  openModalUpdate(conditionpId: number) {
    this.conditionpService.selectedconditionPId = conditionpId;
    this.conditionpService.getconditionPById(conditionpId).subscribe(conditionp => {
        this.updatedconditionp = conditionp;
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
