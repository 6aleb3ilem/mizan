import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DevisService } from './devis.service';
import { Devis } from './devis';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ProjectService } from '../projets/project.service';
import { ProjectClientDTO } from './projectclientdto';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {
  devis: Devis[] = [];
  paginatedData: Devis[] = [];
  dataSource = new MatTableDataSource<Devis>();
  displayedColumns: string[] = ['ref_devis', 'date', 'montantRemise', 'montant', 'montantTva', 'discountp', 'discount', 'projectName', 'clientName', 'details'];
  sortBy: string = ''; // champ par lequel trier
  sortDirection: string = 'asc'; // direction de tri

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private devisService: DevisService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.devisService.getAllDevis().subscribe(devis => {
      this.devis = devis;
      this.dataSource.data = devis;
      this.paginatedData = this.devis.slice(0, 5);
      this.loadProjectAndClientNames();
    });
  }

  loadProjectAndClientNames(): void {
    this.devis.forEach((devis, index) => {
      this.devisService.getProjectAndClientNames(devis.devisId)
        .subscribe(
          (data: ProjectClientDTO) => {
            this.devis[index].projectName = data.projectName;
            this.devis[index].clientName = data.clientName;
            // Mettre à jour les données paginées après avoir reçu les noms
            this.paginateData();
          },
          (error) => {
            console.error('Error fetching project and client names', error);
          }
        );
    });
  }

  paginateData() {
    // Réappliquer la pagination sur les données triées
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.devis.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.devis.slice(startIndex, endIndex);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // Filtrer le tableau devis
    const filteredDevis = this.devis.filter(devis => {
      return devis.montant?.toString().includes(filterValue) ||
        devis.discount?.toString().includes(filterValue) ||
        devis.date?.toString().includes(filterValue) ||
        devis.devisId.toString().includes(filterValue) ||
        (devis.projectName || '').toLowerCase().includes(filterValue) ||
        (devis.clientName || '')?.toLowerCase().includes(filterValue);
    });

    // Réinitialiser la pagination et mettre à jour paginatedData avec les résultats filtrés
    this.paginator.pageIndex = 0;
    this.paginatedData = filteredDevis.slice(0, this.paginator.pageSize);
    this.paginator.length = filteredDevis.length; // Ajuster la longueur totale pour la pagination
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

  openModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'block';
    }
  }

  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }

  openModalDelete() {
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

  // Fonction pour trier les données
  sortData(sortBy: string) {
    this.sortBy = sortBy; // Mettre à jour le champ de tri actuel
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'; // Changer la direction du tri à chaque clic

    // Tri des données en fonction du champ sélectionné
    if (sortBy === 'devisId' || sortBy === 'discount' || sortBy === 'date' || sortBy === 'discountp' || sortBy === 'status' || sortBy === 'note' || sortBy === 'ref_devis' || sortBy === 'montantRemise' || sortBy === 'montantTva' || sortBy === 'montant') {
      this.devis.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return this.sortDirection === 'asc' ? -1 : 1;
        if (a[sortBy] > b[sortBy]) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Mise à jour des données paginées après le tri
    this.paginateData();
  }
}
