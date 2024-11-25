// modaladddevistache.component.ts
import { Component, Input, SimpleChanges } from '@angular/core';
import { DevistacheService } from '../devistache.service';
import { Tache } from '../../tache/tache';
import { Devis } from '../../devis/devis';
import { Router } from '@angular/router';
import { DevisService } from 'src/app/devis/devis.service';
@Component({
  selector: 'app-modaladddevistache',
  templateUrl: './modaladddevistache.component.html',
  styleUrls: ['./modaladddevistache.component.css']
})
export class ModaladddevistacheComponent {
  @Input() tasks: Tache[] = [];
  @Input() projectId!: number;
  @Input() devisId!: number;
  isAdding: boolean = false;

  selectedTaskId: number | null = null;

  constructor(private devistacheService: DevistacheService,private devisService:DevisService ,private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projectId'] && this.projectId) {
      this.loadTasks();
    }
  }
 
  
  checkTaskSelection() {
    if (!this.selectedTaskId) {
      console.log('Please select a task');
    }
  }
  
  loadTasks(): void {
    this.devistacheService.getTasksWithNoDevis(this.projectId).subscribe(tasks => {
      console.log('Loaded tasks:', tasks);
      this.tasks = tasks;
    });
  }

  // addTaskToDevis() {
  //   console.log(`isAdding: ${this.isAdding}, selectedTaskId: ${this.selectedTaskId}, selectedDevistacheId: ${this.devisId}`);
  
  // if (!this.selectedTaskId) {
  //   console.error("No task selected");
  //   return;
  // }
  
  // if (this.isAdding) {
  //   console.error("Add operation is already in progress");
  //   return;
  // }
  
  // if (this.devisId === null) {
  //   console.error("No quote selected");
  //   return;
  // }
  
  //   this.isAdding = true;
  //   let devis: Partial<Devis> = { devisId: this.devisId };
  
  //   console.log(`Adding task ${this.selectedTaskId} to devis ${devis.devisId}`);
  
  //   this.devistacheService.addTaskToDevis(this.selectedTaskId, devis as Devis).subscribe({
  //     next: (response) => {
  //       console.log('Task added successfully:', response);
  //       this.router.navigate(['/devistache', this.projectId, devis.devisId]);
  //     },
  //     error: (error) => {
  //       console.error('Error adding task to devis:', error);
  //       this.isAdding = false;
  //     },
  //     complete: () => {
  //       this.closeModal();
  //       window.location.reload();
  //       this.isAdding = false;
  //     }
  //   });
  //}
  addTaskToDevis() {
    console.log(`isAdding: ${this.isAdding}, selectedTaskId: ${this.selectedTaskId}, selectedDevistacheId: ${this.devisId}`);
    
    if (!this.selectedTaskId) {
      console.error("No task selected");
      return;
    }
    
    if (this.isAdding) {
      console.error("Add operation is already in progress");
      return;
    }
    
    if (this.devisId === null) {
      console.error("No quote selected");
      return;
    }
    
    this.isAdding = true;
    let devis: Partial<Devis> = { devisId: this.devisId };
    
    console.log(`Adding task ${this.selectedTaskId} to devis ${devis.devisId}`);
    
    // Récupérer le montant de la tâche
    this.devisService.getTaskAmount(this.selectedTaskId).subscribe({
      next: (taskAmount) => {
        // Mettre à jour le montant du devis
        this.devisService.updateDevisMontant(this.devisId, taskAmount).subscribe({
          next: () => {
            // Une fois le montant du devis mis à jour, ajouter la tâche au devis
            if (this.selectedTaskId !== null) {
              this.devistacheService.addTaskToDevis(this.selectedTaskId, devis as Devis).subscribe({
                next: (response) => {
                  console.log('Task added successfully:', response);
                  this.router.navigate(['/devistache', this.projectId, devis.devisId]);
                },
                error: (error) => {
                  console.error('Error adding task to devis:', error);
                  this.isAdding = false;
                },
                complete: () => {
                  this.closeModal();
                  window.location.reload();
                  this.isAdding = false;
                }
              });
            } else {
              console.error("No task selected");
              this.isAdding = false;
            }
          },
          error: (error) => {
            console.error('Error updating devis montant:', error);
            this.isAdding = false;
          }
        });
      },
      error: (error) => {
        console.error('Error getting task amount:', error);
        this.isAdding = false;
      }
    });
  }

closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}
