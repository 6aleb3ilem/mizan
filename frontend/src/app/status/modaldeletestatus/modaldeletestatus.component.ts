//modaldeleteStatus.component.ts
import { Component , OnInit} from '@angular/core';
import { StatusService } from '../status.service';
import { Status } from '../status';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';
import { Tache } from 'src/app/tache/tache';
import { Client } from 'src/app/client/client';
import { Item } from 'src/app/item/item';
import { Project } from 'src/app/projets/project';
import { Devisf } from 'src/app/devisf/devisf';
@Component({
  selector: 'app-modaldeletestatus',
  templateUrl: './modaldeletestatus.component.html',
  styleUrls: ['./modaldeletestatus.component.css']
})
export class ModaldeletestatusComponent{
  constructor(private statusService: StatusService,private router: Router) {}
  statusToDeleteId: number | undefined;
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
    console.log(this.statusToDeleteId)
  }
  tache: Tache[] = [];
  devis:Devisf[]=[];
client:Client[]=[];
item:Item[]=[];
projet:Project[]=[];
  ngOnInit(): void {
    forkJoin({
      tache: this.statusService.getAllTaches().pipe(take(1)),
      devis:this.statusService.getAllDevis().pipe(take(1)),
      client:this.statusService.getAllClients().pipe(take(1)),
      item:this.statusService.getAllItems().pipe(take(1)),
      projet:this.statusService.getAllProjects().pipe(take(1)),
    }).subscribe(({ tache, devis,client,item,projet}) => {
      this.tache = tache;
      this.devis=devis;
      this.client=client;
      this.item=item;
      this.projet=projet;
      console.log('tache:', this.tache);
      console.log('devis:', this.devis);

    });
  }
  deleteStatus() {
    if (this.statusService.selectedStatusId) {
      let elementId = this.statusService.selectedStatusId;

      if (elementId !== null) {
        // console.log('tache:', this.tache);
    
        const hasItem = this.item.some(item => item.status && item.status.id === elementId);
        const hastache = this.tache.some(tache => tache.status && tache.status.id === elementId);
        const hasdevis = this.devis.some(devis => devis.status && devis.status.id === elementId);
        const hasclient = this.client.some(client => client.status && client.status.id === elementId);
        const hasprojet = this.projet.some(projet => projet.status && projet.status.id === elementId);

        // Ajoutez des points d'arrêt ici pour vérifier les valeurs de hasTarif et hasItem
        // debugger;
    
        if (hasItem || hastache || hasdevis || hasclient || hasprojet) {
          const warningtache = document.getElementById('warningElement');
          console.log('tache:', this.tache);
          console.log('devis:', this.devis);

          if (warningtache) {
            console.log('tache:', this.tache);
            console.log('devis:', this.devis);

            warningtache.style.display = 'block';
          }
          return; // Stopper la suppression car un tache ou un tache est associé à cet élément
        } else {
      this.statusService.deleteStatusById({ id: this.statusService.selectedStatusId }).subscribe({
        next: () => {
          console.log('Status deleted successfully');
          window.location.reload();
          // Code pour rafraîchir la liste ou naviguer vers une autre page
        },
        error: (error) => {
          console.error('Error deleting Status:', error);
          // Afficher une notification d'erreur ou un message à l'utilisateur
        }
      });}}
    }
    this.closeModalDelete(); // Close modal after deletion
    
  }
  
  
}
