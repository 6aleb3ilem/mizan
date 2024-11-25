import { Component, OnInit, Input } from '@angular/core';
import { Project } from 'src/app/projets/project';
import { ProjectService } from 'src/app/projets/project.service';
import { DevisfService } from '../devisf.service';

@Component({
  selector: 'app-modal-duplicate-devisf',
  templateUrl: './modal-duplicate-devisf.component.html',
  styleUrls: ['./modal-duplicate-devisf.component.css']
})
export class ModalDuplicateDevisfComponent implements OnInit {
  selectedProjectId: number | null = null;
  projects?: Project[];
  @Input() selectedDevisId: number | null = null;

  constructor(private projectService: ProjectService, private DevisfService: DevisfService) { }

  ngOnInit(): void {
    this.projectService.getAllProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  closeModalDupplicate() {
    const modalBackgroundupplicate = document.getElementById('modalBackgroundupplicate');
    if (modalBackgroundupplicate) {
      modalBackgroundupplicate.style.display = 'none';
    }
  }

  openProgressModal() {
    const modalProgress = document.getElementById('modalProgress');
    if (modalProgress) {
      modalProgress.style.display = 'block';
    }
  }

  closeProgressModal() {
    const modalProgress = document.getElementById('modalProgress');
    if (modalProgress) {
      modalProgress.style.display = 'none';
    }
  }

  duplicateDevis() {
    if (this.selectedDevisId && this.selectedProjectId) {
      this.closeModalDupplicate();
      this.openProgressModal();
      this.updateProgressBar(0);
      
      this.DevisfService.collerDevis(this.selectedDevisId, this.selectedProjectId).subscribe({
        next: copie => {
          console.log('Copie du devis:', copie);
          this.updateProgressBar(100);
          setTimeout(() => {
            this.closeProgressModal();
          }, 1000); // Ferme le modal de progression après 1 seconde
        },
        error: err => {
          console.error('Erreur lors de la duplication:', err);
          this.updateProgressBar(0);
        },
        complete: () => {
          this.updateProgressBar(100);
        }
      });

      // Simuler une progression intermédiaire
      setTimeout(() => this.updateProgressBar(30), 500);
      setTimeout(() => this.updateProgressBar(60), 1000);
      setTimeout(() => this.updateProgressBar(90), 1500);
    }
  }

  updateProgressBar(percentage: number) {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
      progressBar.style.width = percentage + '%';
    }
  }
}
