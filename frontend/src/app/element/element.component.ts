// Element.component.ts
import { Component ,OnInit, ViewChild} from '@angular/core';
import { ElementService}  from './element.service';
import { Element } from './element';
import { Router } from '@angular/router';
import { Type } from '../type/type';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-element',
  templateUrl: './element.component.html',
  styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit{
  elementIdToUpdate: number | undefined;
  types: Type[] = [];
  file: File | null = null;
  elements: Element[] = [];
  updatedelement: Element | undefined;
 

   // Injectez le service Router ici
    constructor(private elementService: ElementService,  private router: Router, public dialog: MatDialog) {
    
  }

  ngOnInit(): void {
    this.elementService.getAllElements().subscribe(elements => {
      this.elements = elements;
      this.dataSource.data = elements;
      this.paginatedData = this.elements.slice(0, 5); // Initial pagination setup
    });
  }  
   @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  paginatedData: Element[] = [];
  dataSource = new MatTableDataSource<Element>();
  displayedColumns: string[] = ['id', 'name', 'note','type'];

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.elements.slice(startIndex, endIndex);
  }
  sortBy: string = '';
  sortDirection: string = 'asc';

  // Méthode pour trier les données en fonction du champ spécifié
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le critère sélectionné (ID, nom, note, etc.)
    this.elements.sort((a, b) => {
      const fieldA = this.getFieldValue(a, sortBy);
      const fieldB = this.getFieldValue(b, sortBy);

      if (fieldA < fieldB) return this.sortDirection === 'asc' ? -1 : 1;
      if (fieldA > fieldB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    // Mise à jour des données paginées après le tri
    this.paginateData();
  }

  // Méthode utilitaire pour obtenir la valeur du champ spécifié
  private getFieldValue(element: Element, fieldName: string): any {
    switch (fieldName) {
      case 'id':
        return element.id;
      case 'name':
        return element.name;
      case 'note':
        return element.note;
      case 'type':
        return element.type?.label;
      default:
        return '';
    }
  }

  // Méthode pour paginer les données triées
  paginateData() {
    // Réappliquer la pagination sur les données triées
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.elements.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.elements.filter(element => {
    return element.id.toString().includes(filterValue) || element.name.toLowerCase().includes(filterValue)|| element.note.toLowerCase().includes(filterValue)|| element.type?.id_type.toString().includes(filterValue)|| element.type?.label.toLowerCase().includes(filterValue);
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(element => {
    return {
      id: element.id,
      name: element.name,
      note: element.note,
      type: element.type?.id_type,
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Elements');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'elements.xlsx');
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
  selectedelementId: number | null = null;
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
  openModalUpdate(elementId: number) {
    this.elementService.selectedElementId = elementId;
    this.elementService.getElementById(elementId).subscribe(element => {
        this.updatedelement = element;
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
  openModalDelete(elementId: number) {
    this.elementService.selectedElementId = elementId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }
}
