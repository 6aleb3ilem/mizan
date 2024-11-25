import { Component, Input, OnInit } from '@angular/core';
import { TarifService } from '../tarif.service';
import { UniteService } from '../../unite/unite.service';
import { Unite } from '../../unite/unite';
import { Tarif } from '../tarif';

@Component({
  selector: 'app-modaladdtarif',
  templateUrl: './modaladdtarif.component.html',
  styleUrls: ['./modaladdtarif.component.css']
})
export class ModaladdtarifComponent implements OnInit {
  @Input() elementId!: number;
  unites: Unite[] = [];
  newTarif: Tarif = {
    id: 0,
    element: { 
      id: this.elementId, // Assurez-vous d'avoir l'ID correct ici.
      name: '', 
      note: '',
      type: { id_type: 0, label: '' }, // Initialisez correctement si nécessaire
      elementDevis: [] // Assurez-vous que cela correspond à la structure attendue
    },
    unite: { id: 0, unite: '' },
    pritunit: 0,principal: false
  };
  showPrincipalExistsWarning = false;
  submitTarif() {
      this.addTarif();
  }
  onPrincipalChange() {
    if (!this.newTarif.principal) {
      this.showPrincipalExistsWarning = false;
      return;
    }
  
    if (this.newTarif.principal) {
      this.tarifService.checkPrincipalTarifExistsForElement(this.elementId).subscribe(exists => {
        console.log(`Existe un tarif principal pour l'élément ${this.elementId} :`, exists);
        this.showPrincipalExistsWarning = exists;
      });
    }
  }
  
  
  isAdding: boolean = false;

  constructor(private tarifService: TarifService, private uniteService: UniteService) {}

  ngOnInit(): void {
    console.log("Received elementId:", this.elementId);
    this.newTarif.element.id = this.elementId;
    this.tarifService.getUnitesNotLinkedToElement(this.elementId).subscribe((unites) => {
      this.unites = unites;
    });
  }
  onUniteChange(): void {
    console.log('Unite ID:', this.newTarif.unite.id);
    console.log('Unites:', this.unites);
  
    const selectedUnite = this.unites.find(unite => unite.id.toString() === this.newTarif.unite.id.toString());
    console.log('Selected Unite:', selectedUnite);
  
    if (selectedUnite && selectedUnite.unite == 'ff') {
      this.newTarif.pritunit = 299776775;
    } else {
      this.newTarif.pritunit = 0;
    }
  }
  
  
  addTarif(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.newTarif.element.id = this.elementId; // Assurez-vous que l'ID est défini ici
      if (this.newTarif.element.id) {
        this.tarifService.createTarif(this.newTarif).subscribe({
          next: (result) => {
            this.closeModal();
            window.location.reload();
            this.isAdding = false;

          },
          error: (error) => {
            console.error('Erreur lors de la création du tarif', error);
            this.isAdding = false;
          }
        });
      } else {
        console.error('elementId is not defined');
        this.isAdding = false;
      }
    }
  }
  


  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
}
