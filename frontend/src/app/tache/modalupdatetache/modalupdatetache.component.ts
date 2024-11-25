// modalupdatetache.component.ts
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TacheService } from '../tache.service';
import { Tache } from '../tache';
import { tacheref } from '../../tacheref/tacheref'
import { Router,ActivatedRoute } from '@angular/router';
import { Projet } from '../projet';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modalupdatetache',
  templateUrl: './modalupdatetache.component.html',
  styleUrls: ['./modalupdatetache.component.css']
})
export class ModalupdatetacheComponent implements OnInit{
  Status: any[] = [];
  Priorites: any[] = [];
  @Input() updatedTache: Tache | null = { taskId: 0,
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
  Tacherefs: any[] = [];
  projectTasks: any[] = [];
  filteredTacherefs: any[] = [];
  Tachename: tacheref[] = [];
  filteredTachename: tacheref[] = []; 
  @Input() projet: Projet | undefined; // Propriété d'entrée pour recevoir les données du projet
  constructor(private router: Router, private TacheService: TacheService,private route:ActivatedRoute) {}
  projectId!: number; // Variable to store the projectId

  ngOnInit() {
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
    this.TacheService.getAllPriorites().subscribe(priorites => this.Priorites = priorites);
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




  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
    console.log(this.updatedTache)

  }
  @ViewChild('updateForm') tacheForm!: NgForm;
  updateTache() {
    if (this.tacheForm && !this.tacheForm.valid) {
      // Si le formulaire n'est pas valide, ne continuez pas avec la soumission
      return;
    }
    if (this.TacheService.selectedTacheId && this.updatedTache) {
      this.TacheService.updateTache(this.TacheService.selectedTacheId, this.updatedTache).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
        
      }, error => {
        console.error('Error updating Tache:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedTacheId or updatedTache is null');
      // Handle the error if selectedTacheId or updatedTache is null
    }
  }
  calculateEndDate() {
    if (this.updatedTache!.start) {
      const startDate = new Date(this.updatedTache!.start);
      const endDate = new Date(startDate.setDate(startDate.getDate() + 8));
      const endDateFormatted = endDate.toISOString().split('T')[0];
      this.updatedTache!.deadline = endDateFormatted;
    }
  }
}
