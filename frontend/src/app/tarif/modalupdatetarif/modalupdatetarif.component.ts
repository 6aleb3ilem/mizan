import { Component, Input, OnInit } from '@angular/core';
import { TarifService } from '../tarif.service';
import { Tarif } from '../tarif';
import { Unite } from '../../unite/unite';
import { UniteService } from '../../unite/unite.service';

@Component({
  selector: 'app-modalupdatetarif',
  templateUrl: './modalupdatetarif.component.html',
  styleUrls: ['./modalupdatetarif.component.css']
})
export class ModalupdatetarifComponent implements OnInit {
  @Input() elementId!: number;
  unites: Unite[] = [];
  @Input() updatedTarif: Tarif | null = null;

  constructor(private tarifService: TarifService, private uniteService: UniteService) {}

  ngOnInit() {
    this.tarifService.getUnitesNotLinkedToElement(this.elementId).subscribe(unites => {
      this.unites = unites;
    });

    if (this.updatedTarif) {
      this.onUniteChange(); // Ensure the initial unit selection is correct
    }
  }
  showPrincipalExistsWarning = false;

  onPrincipalChange() {
    if (this.updatedTarif!.principal) {
        this.tarifService.checkPrincipalTarifExistsForElement(this.elementId).subscribe(exists => {
            // If there's another principal tarif for the element, show the warning
            // Note: You might also want to check if the existing principal tarif is not the current one being updated
            this.showPrincipalExistsWarning = exists;
            console.log(`Existe un tarif principal pour l'élément ${this.elementId} :`, exists);
        });
    } else {
        // If the tarif is not set as principal, no need to show the warning
        this.showPrincipalExistsWarning = false;
    }
}

  onUniteChange(): void {
    console.log('Unite ID:', this.updatedTarif!.unite.id);
    console.log('Unites:', this.unites);
  
    const selectedUnite = this.unites.find(unite => unite.id.toString() === this.updatedTarif!.unite.id.toString());
    console.log('Selected Unite:', selectedUnite);
  
    if (selectedUnite && selectedUnite.unite == 'ff') {
      this.updatedTarif!.pritunit = 299776775;
    } else {
      this.updatedTarif!.pritunit = 0;
    }
  }

  updateTarif() {
    if (this.updatedTarif && this.updatedTarif.id) {
      this.tarifService.updateTarif(this.updatedTarif.id, this.updatedTarif).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload();
      }, error => {
        console.error('Error updating Tarif:', error);
      });
    } else {
      console.error('updatedTarif is null or missing ID');
    }
  }

  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
}
