// devistache.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';import { ActivatedRoute } from '@angular/router';
import { DevistacheService } from './devistache.service'; // Ajustez le chemin selon votre structure
import { Tache } from '../tache/tache'; // Ajustez le chemin selon votre structure

@Component({
  selector: 'app-devistache',
  templateUrl: './devistache.component.html',
  styleUrls: ['./devistache.component.css']
})
export class DevistacheComponent implements OnInit {
  taches: Tache[] = [];
  devisId!: number;
  projectId!: number;

  constructor(
    private route: ActivatedRoute,
    private devistacheService: DevistacheService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.devisId = +params['devisId'];
      this.projectId = +params['projectId'];

      // Utilisez this.devisId et this.projectId comme nécessaire
    });
    this.getTasksByDevisId();
  }

  getTasksByDevisId(): void {
    if (this.devisId) {
      this.devistacheService.getTasksByDevisId(this.devisId).subscribe({
        next: (taches) => {
          this.taches = taches;
          this.dataSource.data = taches;
          this.paginatedData = this.taches.slice(0, 5); 
        },
        error: (err) => {
          console.error('Erreur lors de la récupération des tâches: ', err);
        }
      });
    }
  }
  paginatedData: Tache[] = [];
  dataSource = new MatTableDataSource<Tache>();
  displayedColumns: string[] = ['taskId', 'taskName', 'start','deadline','priority','status','refTask','note'];

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  sortBy: string = '';
  sortDirection: string = 'asc';
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le critère sélectionné
    if (sortBy === 'refTask') {
      this.taches.sort((a, b) => {
        if (a.refTask < b.refTask) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.refTask > b.refTask) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'taskName') {
      this.taches.sort((a, b) => {
        if (a.taskName < b.taskName) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.taskName > b.taskName) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'start') {
      this.taches.sort((a, b) => {
        if (a.start < b.start) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.start > b.start) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } // Ajoutez d'autres cas pour d'autres critères de tri si nécessaire
    else if (sortBy === 'deadline') {
      this.taches.sort((a, b) => {
        if (a.deadline < b.deadline) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.deadline > b.deadline) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'priority') {
      this.taches.sort((a, b) => {
        if (a.priority < b.priority) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.priority > b.priority) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'status') {
      this.taches.sort((a, b) => {
        if (a.status < b.status) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.status > b.status) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'note') {
      this.taches.sort((a, b) => {
        if (a.note < b.note) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.note > b.note) return this.sortDirection === 'asc' ? 1 : -1;
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
    this.paginatedData = this.taches.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.taches.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.taches.filter(Tache => {
    return Tache.taskId.toString().includes(filterValue) ||
     Tache.taskName.toLowerCase().includes(filterValue)|| 
     Tache.start.toLowerCase().includes(filterValue)|| 
     Tache.deadline.toString().includes(filterValue)|| 
     Tache.priority.label.toString().includes(filterValue) ||
     Tache.status.label.toString().includes(filterValue) ||
     Tache.refTask.toLowerCase().includes(filterValue) ||
     Tache.note.toString().includes(filterValue) 
     ;
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}
exportToExcel(): void {
  // Map data to include only required fields
  const dataToExport = this.dataSource.filteredData.map(Tache => {
    return {
      id: Tache.taskId,
      name: Tache.taskName,
      start:Tache.start,
      deadline:Tache.deadline,
      priority:Tache.priority,
      status:Tache.status,
      note: Tache.note,
    };
  });

  // Convert data to worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Create a new workbook
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Elements');

  // Save the workbook to an Excel file
  XLSX.writeFile(wb, 'Taches.xlsx');

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
  tasksWithNoDevis: Tache[] = [];

  openModal() {
    this.devistacheService.getTasksWithNoDevis(this.projectId).subscribe({
      next: (tasks) => {
        this.tasksWithNoDevis = tasks;
        console.log("Tâches sans devis:", this.tasksWithNoDevis);
        // Ouvrir la modal ici, une fois les données reçues
        const modalBackground = document.getElementById('modalBackground');
        if (modalBackground) {
          modalBackground.style.display = 'block';
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des tâches sans devis: ', err);
      }
    });
  }
  
  
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  selectedDevistacheId: number | null = null;

  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }
  openModalDelete(taskId: number) {
    this.devistacheService.selectedDevistacheId = taskId;
    // Afficher la modal de suppression
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'block';
    }
  }
  
}
