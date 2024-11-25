import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TacheService } from '../tache.service';
import { Tache } from '../tache';
import { Router,ActivatedRoute } from '@angular/router';
import { Projet } from '../projet';
import { tacheref } from '../../tacheref/tacheref'


@Component({
  selector: 'app-modaladdtache',
  templateUrl: './modaladdtache.component.html',
  styleUrls: ['./modaladdtache.component.css']
})
export class ModaladdtacheComponent {
  isAdding: boolean = false;
  Status: any[] = [];
  Tachename: tacheref[] = [];
  filteredTachename: tacheref[] = []; 
  Priorites: any[] = [];
  @Input() projet: Projet | undefined; // Propriété d'entrée pour recevoir les données du projet

  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  projectId!: number; // Variable to store the projectId

  newTache: Tache = {
    taskId: 0,
    taskName: '',
    start: '',
    deadline: '',
    priority: {id:0,label:''},
    note: '',
    status: {id:0,label:'',tableref:''},   
     refTask:"",
     montant:0,
     totalTask:0
  };

  constructor(private TacheService: TacheService, private router: Router,private route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
      this.TacheService.getProjectById(this.projectId).subscribe((projet: Projet) => {
        this.projet = projet;
        console.log(this.projet);
        // Fetch the tasks already assigned to this project
        this.TacheService.getTachesByProjectId(this.projectId).subscribe(tasks => {
          const taskIdsInProject = new Set(tasks.map(task => task.taskName)); // Assumes taskName is the id
          this.filteredTachename = this.Tachename.filter(tache => !taskIdsInProject.has(tache.label));
        });
      });
    });

    this.TacheService.getAllPriorites().subscribe(priorites => {
      this.Priorites = priorites.filter(priorite => priorite.id !== 0);
      this.Priorites = priorites;
    });
    this.TacheService.getAllStatuss().subscribe(status => {
      this.Status = status;
      console.log('All Status:', this.Status);
    // Filtrer les status pour ne garder que ceux qui sont associés aux tâches
    this.Status = this.Status.filter(s => s.tableref === 'tache'  && s.id !== 0);
    console.log('Filtered Status:', this.Status);
    });
    this.TacheService.getAlltacherefs().subscribe(tachename => {
      this.Tachename = tachename;
    });
  }
  @ViewChild('tacheForm') tacheForm!: NgForm;
  addTache(): void {
    if (this.tacheForm && !this.tacheForm.valid) {
      // Si le formulaire n'est pas valide, ne continuez pas avec la soumission
      return;
    }
    if (!this.isAdding) {
      this.isAdding = true;
      
      this.TacheService.createTache(this.newTache, this.projectId).subscribe({
        next: (savedTask) => {
          // Gestion du succès
          console.log('Tâche ajoutée avec succès', savedTask);
          this.router.navigate(['/tache', this.projectId]);
          this.closeModal();
          window.location.reload();
        },
        error: (error) => {
          // Gestion des erreurs
          console.error('Erreur lors de l’ajout de la tâche', error);
          alert(error.error); // Afficher le message d'erreur retourné par le serveur
          this.isAdding = false;
        }
      });
    }
  }
  
  calculateEndDate() {
    if (this.newTache.start) {
      const startDate = new Date(this.newTache.start);
      const endDate = new Date(startDate.setDate(startDate.getDate() + 8));
      const endDateFormatted = endDate.toISOString().split('T')[0];
      this.newTache.deadline = endDateFormatted;
    }
  }
}
