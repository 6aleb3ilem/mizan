import { Unite } from './../../unite/unite';
// modalupdateitem.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Router } from '@angular/router';
import { Big } from 'big.js';
@Component({
  selector: 'app-modalupdateitem',
  templateUrl: './modalupdateitem.component.html',
  styleUrls: ['./modalupdateitem.component.css']
})
export class ModalupdateitemComponent implements OnInit{
  unites: any[] = [];
  unitePrincipale!: Unite;

  selectedElementType?:string;
  @Input() updatedItem: Item | null = { id: 0, nbreLots: 1,
    qteLots:'',  taskid:0,elementid:0,type:'',
    status:{id:0,label:'',tableref:''}, elementNote: '',  name: '', elementQty: 0,refEdevis:"",prix_unitaire:0,montant:0,unite:'',
 element:{id: 0,name: '',note: '', type:{ id_type: 0,
  label: '' }}
} // Valeur par défaut pour la liste de prix };
selectedElementUnite?:string
elements: any[] = [];
filteredUnites: any[] = [];
Status: any[] = [];

filteredElements: any[] = [];
  constructor(private router: Router, private ItemService: ItemService) {};
  ngOnInit() {
    this.ItemService.getAllElements().subscribe(elements => {
      this.elements = elements;
      if (this.updatedItem) {
        // Assurez-vous que les unités sont chargées lorsque la modal est initialisée
        this.onElementChange(this.updatedItem.elementid);
      }
    });
    // Subscribe to changes in selectedItemId and update the form fields accordingly
    this.ItemService.selectedItemId$.subscribe((ItemId) => {
      if (ItemId) {
        this.ItemService.getItemById(ItemId).subscribe(Item => {
          this.updatedItem = Item;
          console.log(this.updatedItem.unite)
        });
      }
    });
    this.ItemService.getAllStatuss().subscribe(status => {
      this.Status = status;
      console.log('All Status:', this.Status);
    // Filtrer les status pour ne garder que ceux qui sont associés aux tâches
    this.Status = this.Status.filter(s => s.tableref === 'elementdevis');
    console.log('Filtered Status:', this.Status);
    });
  }
  
  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if  (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
  updateItem() {
    if (this.ItemService.selectedItemId && this.updatedItem) {
      this.ItemService.updateItem(this.ItemService.selectedItemId, this.updatedItem).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Item:', error);
        // Handle errors if necessary
      });
    } else {
      console.error('selectedItemId or updatedItem is null');
      // Handle the error if selectedItemId or updatedItem is null
    }
  }


  onElementChange(elementId: number): void {
    this.ItemService.getElementTypeById(elementId).subscribe(type => {
      this.selectedElementType = type.label;
      if (this.updatedItem) {
        this.updatedItem.type = type.label;
      }
      this.ItemService.getUnitesByElementId(elementId).subscribe(response => {
        this.unites = response.unites;
        this.unitePrincipale = response.unitePrincipale;
        this.filteredUnites = this.unites.filter(unite => unite.name !== this.updatedItem?.unite);
  
        // Sélection automatique de l'unité principale
        if (this.unitePrincipale && this.updatedItem) {
          this.updatedItem.unite = this.unitePrincipale.unite;
          this.onUniteChange(elementId, this.unitePrincipale.unite); // Mettre à jour le prix automatiquement
        }
      });
    });
  }
  
  onUniteChange(elementId: number, uniteNom: string): void {
    if (elementId && uniteNom && this.updatedItem) {
      this.ItemService.getPrixUnitaireByElementIdAndUniteNom(elementId, uniteNom).subscribe(prixUnitaire => {
        this.updatedItem!.prix_unitaire = prixUnitaire;
        this.calculateMontant(); // Calculez et mettez à jour le montant ici si nécessaire
      });
    }
  }
  
  calculateMontant(): void {
    if(this.updatedItem){
    if (  this.updatedItem.prix_unitaire && this.updatedItem.elementQty) {
      if(this.updatedItem.nbreLots!=0)
      this.updatedItem.montant = this.updatedItem.prix_unitaire * this.updatedItem.elementQty*this.updatedItem.nbreLots;
   else
   this.updatedItem.montant = this.updatedItem.prix_unitaire * this.updatedItem.elementQty
    } else {
      this.updatedItem.montant = 0; // Réinitialisez le montant si l'une des valeurs est manquante
    }
  }
}
initializeSelectedItem(): number {

  // Supposons que `updatedItem.name` contient le nom de l'élément à sélectionner
  const foundElement = this.elements.find(element => element.name === this.updatedItem?.name);
  if (foundElement) {
    if(this.updatedItem)
      this.updatedItem.elementid = foundElement.id; // Met à jour l'ID pour sélectionner l'option correspondante
    }
    return foundElement.id;

}

}