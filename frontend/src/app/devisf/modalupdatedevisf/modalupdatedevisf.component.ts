import { Component, Input, OnInit } from '@angular/core';
import { DevisfService } from '../devisf.service';
import { Devisf } from '../devisf';
import { ContactService } from '../../contact/contact.service';

@Component({
  selector: 'app-modalupdatedevisf',
  templateUrl: './modalupdatedevisf.component.html',
  styleUrls: ['./modalupdatedevisf.component.css']
})
export class ModalupdatedevisfComponent implements OnInit {
  @Input() projectId!: number;
  applyTVA: boolean = false;
  showDiscount: boolean = false;
  showDiscountP: boolean = false;
  inputGroups: number = 1;
  remise: number=0;
  remiserapportselect: string='';
  modalHeight: string = '560px'; // Initial modal height
  @Input() updatedDevisf: Devisf | null = {
    devisId: 0,discountp:0,
    tva:0,
    ref_devis:'',
    annee:'',
    tva_present: false,
    montant: 0,
    montantRemise: 0,
    montantTva: 0,
    creationDate:'',
    discount:0,date: '',note:'',status:{id:0,label:'',tableref:''}
   ,
   mp1:'',
   mp2:'',
   mp3:'',
   mp4:'',
   mp5:'',
   pmp1:'',
   pmp2:'',
   pmp3:'',
   pmp4:'',
   pmp5:'',
   datedemarage:'',
   remiserapport:'',
   creationDatedemande:''
  };
  selectedcontactId: number | null = null;
  Status: any[] = [];

  constructor(private devisfService: DevisfService,private contactService: ContactService) {}
  onCheckboxChange(field: string): void {
    if (field === 'discount') {
      this.showDiscount = !this.showDiscount;
      this.showDiscountP = false;
      if (!this.showDiscount) {
        this.updatedDevisf!.discount = 0;
      }
    } else if (field === 'discountP') {
      this.showDiscountP = !this.showDiscountP;
      this.showDiscount = false;
      if (!this.showDiscountP) {
        this.updatedDevisf!.discountp = 0;
      }
    }
    else if (field === 'tva') {
      this.applyTVA = !this.applyTVA;
      this.showDiscount = false;
    }
    this.updateModalHeight(); // Update modal height after changes
  }
  updateFieldStatus(): void {
    if (this.updatedDevisf!.discount) {
      this.showDiscountP = false;
    }
    if (this.updatedDevisf!.discountp) {
      this.showDiscount = false;
    }
  }
  
  updateModalHeight(): void {
    // Initial height in pixels
    let baseHeight = 560;
    // Increment for each true condition
    const increment = 40;
    // Calculate the new height based on conditions
    if (this.showDiscount || this.showDiscountP || this.applyTVA) {
      baseHeight += increment;
    }
    // Additional height if more than 3 input-groups are visible
    if (this.numInputs >2 ) {
      baseHeight +=increment;
    }
    if(this.numInputs>=5){
      baseHeight +=increment;
    }
    // Update the modal height
    this.modalHeight = `${baseHeight}px`;
  }
  maxInputs = 5; // Nombre maximal de champs de saisie et de listes déroulantes
  numInputs = 1; // Nombre actuel de champs de saisie et de listes déroulantes visibles

  isVisible(num: number): boolean {
    return num <= this.numInputs;
  }
  updateRemiseRapport() {
    this.updatedDevisf!.remiserapport = `apres ${this.remise || ''} ${this.remiserapportselect || ''}`.trim();
  }
  addInput() {
    if (this.numInputs < this.maxInputs) {
      this.numInputs++;
      this.updateModalHeight();
    }
  }

  removeInput() {
    if (this.numInputs > 1) {
      this.numInputs--;
      this.updateModalHeight();
    }
  }

  ngOnInit() {
    
    this.devisfService.selectedDevisfId$.subscribe(devisfId => {
      if (devisfId) {
        this.devisfService.getDevisfById(devisfId).subscribe(devisf => {
          this.updatedDevisf = devisf ? { ...devisf, } : this.updatedDevisf;
        });
      }
    });
    this.devisfService.getAllStatuss().subscribe(status => {
      this.Status = status;
    });
  }

  updateDevisf() {
    if (this.devisfService.selectedDevisfId && this.updatedDevisf) {
      // Update the Contact of the updateddevisf based on the selectedContactId
      // Send the updated devisf to the backend
      this.devisfService.updateDevisf(this.devisfService.selectedDevisfId, this.updatedDevisf).subscribe(() => {
        this.closeModalUpdate();
        window.location.reload(); // Consider using a more Angular-centric way of updating the view
      }, error => {
        console.error('Error updating devisf:', error);
      });
    } else {
      console.error('selecteddevisfId or updateddevisf is null');
    }
  }

  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
  // get modalHeight(): string {
  //   return this.updatedDevisf?.tva_present ? '600px' : '598px'; // Ajustez les valeurs selon vos besoins
  // }
}
