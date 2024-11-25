
// Exemple dans un composant Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConditiondevisService } from './conditiondevis.service';
import { Conditiondevis } from './conditiondevis';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import * as XLSX from 'xlsx';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-conditiondevis',
  templateUrl: './conditiondevis.component.html',
  styleUrl: './conditiondevis.component.css'
})
export class ConditiondevisComponent {

  conditiondeviss: Conditiondevis[] = [];
  devisId!: number;


  constructor(private conditiondevisService: ConditiondevisService,private route:ActivatedRoute) { }
  updatedconditiondevis: Conditiondevis | undefined;
 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.devisId = +params['devisId']; // Utilisez le signe '+' pour convertir en nombre si nécessaire
    if (this.devisId) {
      this.conditiondevisService.getConditiondevissByDevisId(this.devisId).subscribe(conditiondeviss => {
        this.conditiondeviss = conditiondeviss;
        this.dataSource.data = conditiondeviss;
      this.paginatedData = this.conditiondeviss.slice(0, 5); // Initial pagination setup
      });
    }
  });
}

@ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  paginatedData: Conditiondevis[] = [];
  dataSource = new MatTableDataSource<Conditiondevis>();
  displayedColumns: string[] = ['id', 'conditionP', 'devis'];
  sortBy: string = '';
  sortDirection: string = 'asc';
  
  // Fonction pour trier les données
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le champ sélectionné
    if (sortBy === 'id') {
      this.conditiondeviss.sort((a, b) => {
        if (a.id < b.id) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.id > b.id) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'conditionP') {
      this.conditiondeviss.sort((a, b) => {
        if (a.conditionp.label < b.conditionp.label) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.conditionp.label > b.conditionp.label) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'devis') {
      this.conditiondeviss.sort((a, b) => {
      if (a.devis?.ref_devis < b.devis?.ref_devis) return this.sortDirection === 'asc' ? -1 : 1;
      if (a.devis?.ref_devis > b.devis?.ref_devis) return this.sortDirection === 'asc' ? 1 : -1;
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
    this.paginatedData = this.conditiondeviss.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.conditiondeviss.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.conditiondeviss.filter(conditiondevis => {
    return conditiondevis.id.toString().includes(filterValue) || 
    conditiondevis.conditionp.label.toLowerCase().includes(filterValue)|| 
    conditiondevis.devis.ref_devis.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(conditiondevis => {
    return {
      id: conditiondevis.id,
      conditionP: conditiondevis.conditionp.label,
      devis: conditiondevis.devis.ref_devis,
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Conditiondeviss');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'conditiondeviss.xlsx');
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
  loadConditiondeviss(): void {
    this.conditiondevisService.getAllConditiondeviss().subscribe(conditiondeviss => {
      this.conditiondeviss = conditiondeviss;
    });
  }
  openModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
    console.log(this.devisId)
  }
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  selectedconditiondevisId: number | null = null;
  openModalUpdate(conditiondevisId: number) {
    this.conditiondevisService.selectedConditiondevisId = conditiondevisId;
    this.conditiondevisService.getConditiondevisById(conditiondevisId).subscribe(conditiondevis => {
        this.updatedconditiondevis = conditiondevis;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });console.log(this.conditiondeviss)
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
  openModalDelete(conditiondevisId: number) {
    this.conditiondevisService.selectedConditiondevisId = conditiondevisId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }
}
