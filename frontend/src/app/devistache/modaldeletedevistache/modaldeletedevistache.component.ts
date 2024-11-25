import { Component, Input } from '@angular/core';
import { DevistacheService } from '../devistache.service';
import { Router } from '@angular/router';
import { Devis } from 'src/app/devis/devis';
import { DevisService } from 'src/app/devis/devis.service';

@Component({
  selector: 'app-modaldeletedevistache',
  templateUrl: './modaldeletedevistache.component.html',
  styleUrls: ['./modaldeletedevistache.component.css']
})
export class ModaldeletedevistacheComponent {
  @Input() projectId!: number;
  @Input() devisId!: number;
  constructor(private DevistacheService: DevistacheService, private router: Router,private devisService:DevisService ) {}
  DevistacheToDeleteId: number | undefined;

  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    
  }

  deleteDevistache() {
    let devis: Partial<Devis> = { devisId: this.devisId };
    let taskId = this.DevistacheService.selectedDevistacheId;
    if (taskId !== null) {
        console.log("hjdsds " + taskId);
        this.devisService.getTaskAmount(taskId).subscribe({
            next: (taskAmount) => {
                // Mettre à jour le montant du devis
                this.devisService.updateDevisMontant1(this.devisId, taskAmount).subscribe({
                    next: () => {
                        this.DevistacheService.deleteTaskFromDevis(taskId).subscribe({
                            next: () => {
                                console.log('Task deleted successfully');
                                this.router.navigate(['/devistache', this.projectId, devis.devisId]); // Ajustez l'URL selon vos besoins
                            },
                            error: (error) => {
                                console.error('Error deleting task:', error);
                            },
                            complete: () => {
                                this.closeModalDelete(); // Fermez la modal après la suppression
                                window.location.reload();
                            }
                        });
                    },
                    error: (error) => {
                        console.error('Error updating devis amount:', error);
                    }
                });
            },
            error: (error) => {
                console.error('Error getting task amount:', error);
            }
        });
    } else {
        console.error('Task ID is null');
    }
}
}
