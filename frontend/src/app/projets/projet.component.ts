import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from './project';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  ProjectIdToUpdate: number | undefined;
  dernierProjetId: number = 0;
  updatedProject: Project | null =  { // Define the newProject property
    projectId:0, // Add projectId property
    creationDate: "",
    refProjet:'',
    annee:"",
    projectMO: '',
    projectMOE: '',
    projectBCT: {id:0,label:''},
    status:{id:0,label:'',tableref:''},
     situation:{id:0,label:''},
    projectLocation: '',
    title: '',clientId:0,
    client: { id: 0, name: '', email: '', telephone: '', address: '', status: {id:0,label:'',tableref:''}, note: '', contacts: [] }
  };
  projects: Project[] = [];
  clients: any[] = [];
  selectedClientId: number | undefined;

  constructor(private projectService: ProjectService,  private authService: AuthService,  private route: ActivatedRoute,private http: HttpClient) {}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const contactId = params.has('contactId') ? +params.get('contactId')! : null;
    const clientId = params.has('clientId') ? +params.get('clientId')! : null;
    
    if (contactId) {
      this.loadProjectsByContact(contactId);
    } else if (clientId) {
      this.loadProjectsByClient(clientId);
    } else {
      this.loadProjects();
    }

  });
  this.projectService.getAllProjects().subscribe(projects => {
    if (projects && projects.length > 0) {
      this.dernierProjetId = projects[projects.length - 1].projectId || 0;
    }  
  });
}


  loadProjects1(contactId: number | null, clientId: number | null): void {
    this.projectService.getProjects(contactId, clientId).subscribe(projects => {
      this.projects = projects;
      // Mettez à jour l'UI ou la dataSource selon votre implémentation
      this.dataSource.data = projects;
    });
  }
  isViewInitialized: boolean = false;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.isViewInitialized = true;
    // Maintenant que la vue est initialisée, vous pouvez effectuer des opérations sûres sur le paginator.
  }
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

  paginatedData: Project[] = [];
  dataSource = new MatTableDataSource<Project>();
  displayedColumns: string[] = ['situation','status','projectId', 'projectMO','projectMOE','creationDate','projectLocation','title','refProjet','client','projectBCT'];
  sortBy: string = '';
  sortDirection: string = 'asc';
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le critère sélectionné
    if (sortBy === 'refProjet') {
      this.projects.sort((a, b) => {
        if (a.refProjet < b.refProjet) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.refProjet > b.refProjet) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'title') {
      this.projects.sort((a, b) => {
        if (a.title < b.title) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.title > b.title) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'client') {
      this.projects.sort((a, b) => {
        if (a.client!.name < b.client!.name) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.client!.name > b.client!.name) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } // Ajoutez d'autres cas pour d'autres critères de tri si nécessaire
    else if (sortBy === 'projectMO') {
      this.projects.sort((a, b) => {
        if (a.projectMO < b.projectMO) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.projectMO > b.projectMO) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'projectMOE') {
      this.projects.sort((a, b) => {
        if (a.projectMOE < b.projectMOE) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.projectMOE > b.projectMOE) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'creationDate') {
      this.projects.sort((a, b) => {
        if (a.creationDate < b.creationDate) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.creationDate > b.creationDate) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'projectLocation') {
      this.projects.sort((a, b) => {
        if (a.projectLocation < b.projectLocation) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.projectLocation > b.projectLocation) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }else if (sortBy === 'projectBCT') {
      this.projects.sort((a, b) => {
        if (a.projectBCT.label < b.projectBCT.label) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.projectBCT.label > b.projectBCT.label) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    else if (sortBy === 'situation') {
      this.projects.sort((a, b) => {
        if (a.situation.label < b.situation.label) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.situation.label > b.situation.label) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    else if (sortBy === 'status') {
      this.projects.sort((a, b) => {
        if (a.status.label < b.status.label) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.status.label > b.status.label) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    // Mise à jour des données paginées après le tri
    this.paginateData();
  }
  paginateData() {
    if (!this.isViewInitialized) {
    // Réappliquer la pagination sur les données triées
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.projects.slice(startIndex, endIndex);
  }}
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.projects.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
    // Si la valeur de recherche est vide, afficher tous les projets
    if (!filterValue) {
      this.paginatedData = this.projects.slice(0, 5);
      return;
    }
  
    this.paginatedData = this.projects.filter(project => {
      return (project.projectId && project.projectId.toString().includes(filterValue)) ||  
             (project.projectMO && project.projectMO.toLowerCase().includes(filterValue)) || 
             (project.projectMOE && project.projectMOE.toLowerCase().includes(filterValue)) ||
             (project.creationDate && project.creationDate.toLowerCase().includes(filterValue)) || 
             (project.projectLocation && project.projectLocation.toLowerCase().includes(filterValue)) || 
             (project.title && project.title.toLowerCase().includes(filterValue)) || 
             (project.refProjet && project.refProjet.toLowerCase().includes(filterValue)) || 
             (project.client && project.client.name && project.client.name.toLowerCase().includes(filterValue)) || 
             (project.projectBCT && project.projectBCT.toString().includes(filterValue))||
             (project.situation && project.situation.toString().includes(filterValue))||
             (project.status && project.status.toString().includes(filterValue))
             ;
    });
  
    // Si le paginatore existe, réinitialiser à la première page
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  
  exportToExcel(): void {
    const dataToExport = this.projects.map(project => ({
      projectId: project.projectId,
      creationDate: project.creationDate,
      projectMO: project.projectMO,
      projectMOE: project.projectMOE,
      projectBCT: project.projectBCT,
      projectLocation: project.projectLocation,
      title: project.title,
      refProjet: project.refProjet,
     status:project.status.label, 
     annee: project.annee,
      client: project.client?.name || 'Aucun client', // Use optional chaining to safely access the client's name
      // Include any other fields you want to export...
      
    }));
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects');
    XLSX.writeFile(workbook, 'ProjectsExport.xlsx');
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
  loadProjects(): void {
    
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
      this.dataSource.data = projects;
      this.paginatedData = this.projects.slice(0, 5); 
    });
  }

  loadClients(): void {
    this.projectService.getAllClients().subscribe(clients => {
      this.clients = clients;
      this.dataSource.data = clients;
      this.paginatedData = this.clients.slice(0, 5); // Initial pagination setup
    });
  }
  loadProjectsByContact(contactId: number) {
    this.projects=[];

    this.projectService.getProjectsByContactId(contactId).subscribe({
      next: (projects) => {
        this.projects = projects || []; // Assurez-vous que projects n'est jamais null
        this.dataSource.data = projects || []; // Même chose pour dataSource.data
        this.paginatedData = this.projects.slice(0, 5); 

        this.paginateData(); // Appelez paginateData ici pour initialiser paginatedData
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
        this.projects = []; // Réinitialisez projects en cas d'erreur
        this.dataSource.data = []; // Réinitialisez dataSource.data en cas d'erreur
        this.paginateData(); // Réinitialisez paginatedData
      }
    });
  }
  
  loadProjectsByClient(clientId: number) {
    this.projects=[];

    this.projectService.getProjectsByClientId(clientId).subscribe({
      next: (projects) => {
        this.projects = projects || []; // Assurez-vous que projects n'est jamais null
        this.dataSource.data = projects || []; // Même chose pour dataSource.data
        this.paginatedData = this.projects.slice(0, 5); 

        this.paginateData(); // Appelez paginateData ici pour initialiser paginatedData
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des projets:', error);
        this.projects = []; // Réinitialisez projects en cas d'erreur
        this.dataSource.data = []; // Réinitialisez dataSource.data en cas d'erreur
        this.paginateData(); // Réinitialisez paginatedData
      }
    });
  }
  createProject(project: Project): void {
    if (this.selectedClientId) {
      this.projectService.createProject(project, this.selectedClientId).subscribe(() => {
        // Handle success, e.g., show a success message or navigate to another page
      }, error => {
        console.error('Error creating project:', error);
        // Handle error, e.g., show an error message
      });
    } else {
      console.error('Please select a client');
      // Handle case where no client is selected
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

  openModalUpdate(ProjectId: number | null) {
    this.projectService.selectedProjectId = ProjectId;
    this.projectService.getProjectById(ProjectId).subscribe(Project => {
        this.updatedProject = Project;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });
}
duplicateAndOpenModal(projectId: number | null) {
  this.projectService.duplicateProject(projectId).subscribe(duplicatedProject => {
    this.updatedProject = duplicatedProject;
    // Ici, vous devez réinitialiser les propriétés qui doivent être uniques pour le nouveau projet
    this.updatedProject.projectId = null; // Pour qu'un nouvel ID soit généré lors de la sauvegarde

    // Ouvrez la modal de mise à jour avec les données dupliquées
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
        modalBackgroundupdate.style.display = 'block';
    }  });
}
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }


  openModalDelete(ProjectId: number | null) {
    this.projectService.selectedProjectId = ProjectId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }

  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }

  createDevis(project: any) {
    this.projectService.create_devis(project);
  }


  isAdmin(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('ADMIN') || roles.includes('SUPERADMIN');
  }
  
}
