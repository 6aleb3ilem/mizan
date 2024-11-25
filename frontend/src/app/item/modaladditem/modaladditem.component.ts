import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../item';
import { Unite } from '../unite';

@Component({
  selector: 'app-modaladditem',
  templateUrl: './modaladditem.component.html',
  styleUrls: ['./modaladditem.component.css']
})
export class ModaladditemComponent implements OnInit {
  isAdding: boolean = false;
  selectedElementType: string = '';
  unitePrincipale!: Unite;
  Status: any[] = [];
  isSelected: boolean = true; // ou false selon votre besoin
  listeDePrix: any[] = [];
  elements: any[] = [];
  unites: any[] = []; // Utilisez le type approprié pour vos unités
  newItem: Item = {
    id: 0,
    elementNote: '',
    name: '',
nbreLots:1,
qteLots:'',
    status:{id:0,label:'',tableref:''},
    elementQty: 0,
    taskid: 0,
    elementid:0,
    refEdevis:"",
    type:'',
    prix_unitaire:0,
    montant:0,unite:'',
    // ListeDePrix: { id: 0, name: '', note: '', price: 0, type: '', unit: '' },  
    // Valeur par défaut pour la tâche
element:{id: 0,name: '',note: '',type: { id_type: 0,
  label: '' }}
  };

  constructor(
    private ItemService: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.newItem.taskid = +params['taskId']; 
    });
  
    this.ItemService.getAllElements().subscribe(elements => {
      this.elements = elements;
    });
  
    // Assurez-vous que newItem et newItem.element.id sont bien initialisés avant de faire cet appel
      this.ItemService.getPrixUnitaireByElementIdAndUniteNom(this.newItem.element.id, this.newItem.unite).subscribe(prixUnitaire => {
        this.newItem.prix_unitaire = prixUnitaire;
        // Mettez à jour le montant ici si nécessaire
        console.log(prixUnitaire)
      });
    
      this.ItemService.getAllStatuss().subscribe(status => {
        this.Status = status;
        console.log('All Status:', this.Status);
      // Filtrer les status pour ne garder que ceux qui sont associés aux tâches
      this.Status = this.Status.filter(s => s.tableref === 'elementdevis');
      console.log('Filtered Status:', this.Status);
      });
      this.isSelected = this.unitePrincipale && this.newItem.unite === this.unitePrincipale.unite;
      if (this.elements.length > 0) {
        this.onElementChange(this.elements[0].id);
      }
  }
  
  closeModal(): void {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }

  addItem(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      // Récupérer la valeur de l'élément sélectionné dans le ng-select
      const elementId = this.newItem.elementid;
  
      // Appeler la méthode createItem avec taskId et elementId
      this.ItemService.createItem(this.newItem, this.newItem.taskid, elementId).subscribe(() => {
        // Rediriger ou effectuer toute autre action après avoir ajouté l'élément
        this.router.navigate(['/Item', this.newItem.taskid]);
        this.closeModal();
        window.location.reload();
        this.isAdding = false;
      });
    }
  }
  

  onElementChange(elementId: number): void {
    this.ItemService.getElementTypeById(elementId).subscribe(type => {
      this.selectedElementType = type.label;
      this.newItem.type = type.label;
      this.newItem.element.id = elementId;
      
      // Fetch units associated with the element
      this.ItemService.getUnitesByElementId(elementId).subscribe(response => {
        this.unites = response.unites;
        this.unitePrincipale = response.unitePrincipale;
        
        if (this.unitePrincipale) {
          // Set the default unit and fetch the price
          this.newItem.unite = this.unitePrincipale.unite;
          this.onUniteChange(elementId, this.unitePrincipale.unite);
        }
      });
    });
  }
  
  
  setDefaultUnitAndPrice(): void {
    // Assurez-vous que cet appel est fait après que newItem.elementid et newItem.unite ont leurs valeurs par défaut
    this.onElementChange(this.newItem.elementid);
  }

  onUniteChange(elementId: number, uniteNom: string): void {
    if (elementId && uniteNom) {
      this.ItemService.getPrixUnitaireByElementIdAndUniteNom(elementId, uniteNom).subscribe(prixUnitaire => {
        this.newItem.prix_unitaire = prixUnitaire;
        // Now that the unit price has been updated, recalculate the amount
        this.calculateMontant();
      });
    }
  }
  
  
  calculateMontant(): void {
    if (this.newItem.prix_unitaire && this.newItem.elementQty) {
      console.log(this.newItem.nbreLots)
      if(this.newItem.nbreLots!==0)
      this.newItem.montant = this.newItem.prix_unitaire * this.newItem.elementQty *this.newItem.nbreLots;

    } else {
      this.newItem.montant = 0; // Réinitialisez le montant si l'une des valeurs est manquante
    }
  }
}