
// tache.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { TacheService } from './tache.service';
import { Tache } from './tache';
import { ActivatedRoute } from '@angular/router';
import { Projet } from './projet';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit{
  TacheIdToUpdate: number | undefined;
  projectId: number | undefined;
  projet:Projet | undefined;
  Taches: Tache[] = [];
  updatedTache: Tache | undefined;
   // Injectez le service Router ici
    constructor(private TacheService: TacheService,  private authService: AuthService,private route:ActivatedRoute ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
        this.projectId = params['projectId'];
        this.loadTaches();
    });
}

loadTaches(): void {
    if (this.projectId) {
        this.TacheService.getTachesByProjectId(this.projectId).subscribe(taches => {
            this.Taches = taches;
            this.dataSource.data = taches;
      this.paginatedData = this.Taches.slice(0, 5); 
        });
        this.TacheService.getProjectById(this.projectId).subscribe((projet: Projet) => {
          this.projet = projet; // Passer les données du projet au composant enfant
          console.log(this.projet );
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
      this.Taches.sort((a, b) => {
        if (a.refTask < b.refTask) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.refTask > b.refTask) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'taskName') {
      this.Taches.sort((a, b) => {
        if (a.taskName < b.taskName) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.taskName > b.taskName) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'start') {
      this.Taches.sort((a, b) => {
        if (a.start < b.start) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.start > b.start) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } // Ajoutez d'autres cas pour d'autres critères de tri si nécessaire
    else if (sortBy === 'deadline') {
      this.Taches.sort((a, b) => {
        if (a.deadline < b.deadline) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.deadline > b.deadline) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'priority') {
      this.Taches.sort((a, b) => {
        if (a.priority.label < b.priority.label) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.priority.label > b.priority.label) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'status') {
      this.Taches.sort((a, b) => {
        if (a.status < b.status) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.status > b.status) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'note') {
      this.Taches.sort((a, b) => {
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
    this.paginatedData = this.Taches.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.Taches.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.Taches.filter(Tache => {
    return Tache.taskId.toString().includes(filterValue) ||
     Tache.taskName.toLowerCase().includes(filterValue)|| 
     Tache.start.toLowerCase().includes(filterValue)|| 
     Tache.deadline.toString().includes(filterValue)|| 
     Tache.priority.label.toLowerCase().includes(filterValue) ||
     Tache.status.label.toLowerCase().includes(filterValue) ||
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
      taskName: Tache.taskName,
      start:Tache.start,
      deadline:Tache.deadline,
      priority:Tache.priority,
      status:Tache.status,
      refTask: Tache.refTask,
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
  }else {
    console.error('Modal background element not found');
  }
}
closeModalimp() {
  const modalBackground = document.getElementById('importModalBackground');
  if (modalBackground) {
    modalBackground.style.display = 'none';
  }
}
  selectedTacheId: number | null = null;

  openModalDelete(TacheId: number) {
    this.TacheService.selectedTacheId = TacheId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
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
  openModalUpdate(TacheId: number) {
    this.TacheService.selectedTacheId = TacheId;
    this.TacheService.getTacheById(TacheId).subscribe(Tache => {
        this.updatedTache = Tache;
        // console.log(this.updatedTache)
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
  isAdmin(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('ADMIN') || roles.includes('SUPERADMIN');
  }
}

