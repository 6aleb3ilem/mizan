// modalupdateprojet.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { ProjectService } from '../project.service';
import { Project } from '../project';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client/client.service'; // Assurez-vous de spécifier le bon chemin
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-modalupdateprojet',
  templateUrl: './modalupdateprojet.component.html',
  styleUrls: ['./modalupdateprojet.component.css']
})
export class ModalupdateprojetComponent implements OnInit {
  @Input() updatedProject: Project | null = {clientId:0, projectId: 0, title: '', projectBCT: {id:0,label:''},
  status:{id:0,label:'',tableref:''}, situation:{id:0,label:''},projectMO: '', projectLocation: '', projectMOE: '', creationDate: "",refProjet:'',annee:"", client: { id: 0, name: '', email: '', telephone: '', address: '', status: {id:0,label:'',tableref:''}, note: '', contacts: [] } };
  clients: any[] = []; // Définissez une propriété pour stocker la liste des clients
  Status: any[] = [];
  situation: any[] = [];
  bct: any[] = [];
  constructor(private router: Router, private projectService: ProjectService, private clientService: ClientService) {}

  ngOnInit() {
    // Abonnez-vous aux changements dans selectedProjectId et mettez à jour les champs du formulaire en conséquence
    this.projectService.selectedProjectId$.subscribe((projectId) => {
      if (projectId) {
        this.projectService.getProjectById(projectId).subscribe((project) => {
          this.updatedProject = project;
        });
      }
    });

    // Récupérez la liste des clients
    this.clientService.getAllClients().subscribe((clients) => {
      this.clients = clients;
    });
    this.projectService.getAllStatuss().subscribe(status => {
      this.Status = status.filter(status => status.tableref === 'projet'); // Filter here
      console.log(this.Status);
    });
    this.projectService.getAllBCTs().subscribe(bct => {
      this.bct = bct;
    });
    this.projectService.getAllSituations().subscribe(situation => {
      this.situation = situation;
    });
  }

  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  } onSubmit() {
    if (this.updatedProject) {
      if (!this.updatedProject.projectId) {
        this.projectService.generateProjectReference(this.updatedProject.annee!)
          .pipe(
            switchMap((refProjet: string) => {
              if (this.updatedProject) {
                this.updatedProject.refProjet = refProjet;
                return this.projectService.createProject(this.updatedProject);
              } else {
                throw new Error('Updated project is undefined');
              }
            })
          )
          .subscribe({
            next: (newProject) => {
              console.log('New project created:', newProject);
              this.closeModalUpdate();
              window.location.reload();
            },
            error: (error) => {
              console.error('Error during project creation:', error);
              alert('There was an error creating the project');
            }
          });
      } else if (this.updatedProject && this.updatedProject.projectId) {
        this.projectService.updateProject(this.updatedProject.projectId, this.updatedProject)
          .subscribe({
            next: (updatedProject) => {
              console.log('Project updated:', updatedProject);
              this.closeModalUpdate();            
              window.location.reload();
            },
            error: (error) => {
              let errorMessage = "Le titre ou la référence du projet sont déjà utilisés. Veuillez réessayer.";
              if (typeof error.error === 'string') {
                errorMessage = error.error;
              } else {
                console.log("Structure d'erreur non attendue:", error.error);
              }
              alert(errorMessage);
            }
          });
      }
    } else {
      console.error('Attempted to submit with no project selected.');
    }
  }
  
}
