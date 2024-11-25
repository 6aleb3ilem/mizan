import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TacherefService } from '../tacheref.service';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Tache } from 'src/app/tache/tache';
import { tacheref } from '../tacheref';
@Component({
  selector: 'app-modaldeleteT',
 
  templateUrl: './modaldelete.component.html',
  styleUrl: './modaldelete.component.css'
})
export class ModaldeleteTComponent {

  // Change uniteService to public so it can be accessed in the template
  constructor(public tacherefService: TacherefService, private router: Router) {}
  tache: Tache[] = [];
  @Input() updatedtacheref: tacheref | null = { id: 0, label: ''};

  ngOnInit(): void {
    forkJoin({
      tache: this.tacherefService.getAllTaches().pipe(take(1))
    }).subscribe(({ tache }) => {
      this.tache = tache;
      console.log('tache:', this.tache);
    });
  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.tacherefService.selectedtacherefId); // Now this uses the public service
  }

  deletetacherf() {
    if (this.tacherefService.selectedtacherefId) {
      let elementId = this.tacherefService.selectedtacherefId;
  
      if (elementId !== null) {
        const taskname = this.tache.find(tache => tache.taskId === elementId)?.taskName;
        console.log('Taskname:', taskname);
  
        const hasItem = this.tache.some(tache => tache.taskId && tache.taskName !== this.updatedtacheref?.label);
        
        if (hasItem) {
          const warningtache = document.getElementById('warningElement');
          console.log('tache:', this.tache);
          if (warningtache) {
            console.log('tache:', this.tache);
            warningtache.style.display = 'block';
          }
          return; // Stopper la suppression car un tache ou un tache est associé à cet élément
        } else {
          this.tacherefService.deletetacherefById({ id: this.tacherefService.selectedtacherefId }).subscribe({
            next: () => {
              console.log('BCT deleted successfully');
              // Ici, vous pouvez mettre à jour l'affichage ou naviguer vers une autre route
              // par exemple, rafraîchir la liste des unités
              this.router.navigate(['/tacheref']).then(() => {
                window.location.reload();
              });
            },
            error: (error) => {
              console.error('Error deleting tache:', error);
              // Afficher un message d'erreur à l'utilisateur
            }
          });
        }
      }
    } else {
      console.log('No tache ID selected');
    }
    this.closeModalDelete(); // Close modal after deletion
  }
  
  
}
