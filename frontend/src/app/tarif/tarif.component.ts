
// Tarif.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { TarifService } from './tarif.service';
import { Tarif } from './tarif';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-tarif',
  templateUrl: './tarif.component.html',
  styleUrls: ['./tarif.component.css']
})
export class TarifComponent implements OnInit {
  paginatedData: Tarif[] = [];
  tarifs: Tarif[] = [];
  file: File | null = null;
  dataSource = new MatTableDataSource<Tarif>();
  displayedColumns: string[] = ['id', 'elementId', 'uniteId', 'prix', 'isPrincipal', 'element', 'unite', 'action'];
  elementId!: number;
  constructor(private tarifService: TarifService, private route: ActivatedRoute) { }
  updatedtarif: Tarif | undefined;
 // Dans tarif.component.ts
 ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.elementId = +params['id'];
    if (this.elementId) {
      this.tarifService.getTarifsByElementId(this.elementId).subscribe(tarifs => {
        this.tarifs = tarifs;
        this.dataSource.data = tarifs;
        this.paginatedData = this.tarifs.slice(0, 5); // Initial pagination setup
      });
    }
  });
}

onPageChange(event: PageEvent): void {
  const startIndex = event.pageIndex * event.pageSize;
  const endIndex = startIndex + event.pageSize;
  this.paginatedData = this.tarifs.slice(startIndex, endIndex);
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(tarif => {
    return {
      id: tarif.id,
      pritunit: tarif.pritunit,
      principal: tarif.principal ? 'VRAI' : 'FAUX',
      elementId: tarif.element.id,
      element: tarif.element.name,
      uniteId:tarif.unite.id,
      unite:tarif.unite.unite,
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Tarifs');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'tarifs.xlsx');
}
sortBy: string = '';
  sortDirection: string = 'asc';

  // Méthode pour trier les données
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le champ sélectionné
    if (sortBy === 'id') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.id - b.id : b.id - a.id;
      });
    } else if (sortBy === 'elementId') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.element.id - b.element.id : b.element.id - a.element.id;
      });
    } else if (sortBy === 'uniteId') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.unite.id - b.unite.id : b.unite.id - a.unite.id;
      });
    } else if (sortBy === 'prix') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.pritunit - b.pritunit : b.pritunit - a.pritunit;
      });
    } else if (sortBy === 'isPrincipal') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? (a.principal ? -1 : 1) : (b.principal ? -1 : 1);
      });
    } else if (sortBy === 'element') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.element.name.localeCompare(b.element.name) : b.element.name.localeCompare(a.element.name);
      });
    } else if (sortBy === 'unite') {
      this.tarifs.sort((a, b) => {
        return this.sortDirection === 'asc' ? a.unite.unite.localeCompare(b.unite.unite) : b.unite.unite.localeCompare(a.unite.unite);
      });
    }

    // Mise à jour des données paginées après le tri
    this.paginateData();
  }
  paginateData() {
    // Réappliquer la pagination sur les données triées
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.tarifs.slice(startIndex, endIndex);
  }
applyFilter(event: Event): void {
  const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.tarifs.filter(tarif => {
    return tarif.id.toString().includes(filterValue) ||
           tarif.element.id.toString().includes(filterValue) ||
           tarif.unite.id.toString().includes(filterValue) ||
           tarif.pritunit.toString().includes(filterValue) ||
           (tarif.principal ? 'oui' : 'non').includes(filterValue) ||
           tarif.element.name.toLowerCase().includes(filterValue) ||
           tarif.unite.unite.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}

  loadTarifs(): void {
    this.tarifService.getAllTarifs().subscribe(tarifs => {
      this.tarifs = tarifs;
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
  
  openModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
    console.log(this.elementId)
  }
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  
  selectedtarifId: number | null = null;
  openModalUpdate(tarifId: number) {
    this.tarifService.selectedTarifId = tarifId;
    this.tarifService.getTarifById(tarifId).subscribe(tarif => {
        this.updatedtarif = tarif;
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
  openModalDelete(tarifId: number) {
    this.tarifService.selectedTarifId = tarifId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }
}
