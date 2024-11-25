import { Component, Input, OnInit } from '@angular/core';
import { DevisfService } from '../devisf.service';
import { Devisf } from '../devisf';
import { Status } from 'src/app/status/status';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-modaladddevisf',
  templateUrl: './modaladddevisf.component.html',
  styleUrls: ['./modaladddevisf.component.css']
})
export class ModaladddevisfComponent implements OnInit {
  @Input() projectId!: number;
  disableDiscount: boolean = false;
disableDiscountP: boolean = false;
  tvaValue: number = 16; 
  selectedValue: string= '';

  newDevisf: Devisf = {
    devisId: 0,discountp:0,
    tva:16,
    ref_devis:'',
    annee:'',
    tva_present: false,
    montant: 0,
    montantRemise: 0,
    montantTva: 0,
    creationDate:'',
    discount:0,date: '',note:'',status:{id:0,label:'',tableref:''},
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
  remise: number=0;
  remiserapportselect: string='';
  isAdding: boolean = false;
  Status: any[] = [];
  inputGroups: number = 1;
  modalHeight: string = '570px'; // Initial modal height
  applyTVA: boolean = false;
  showDiscount: boolean = false;
  showDiscountP: boolean = false;
  
  constructor( private router: Router,private devisfService: DevisfService,private route:ActivatedRoute) {}
  maxInputs = 5; // Nombre maximal de champs de saisie et de listes déroulantes
  numInputs = 1; // Nombre actuel de champs de saisie et de listes déroulantes visibles

  isVisible(num: number): boolean {
    return num <= this.numInputs;
  }
  updateRemiseRapport() {
    this.newDevisf.remiserapport = `apres ${this.remise || ''} ${this.remiserapportselect || ''}`.trim();
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

  onCheckboxChange(field: string): void {
    if (field === 'discount') {
      this.showDiscount = !this.showDiscount;
      this.showDiscountP = false;
      if (!this.showDiscount) {
        this.newDevisf.discount = 0;
      }
    } else if (field === 'discountP') {
      this.showDiscountP = !this.showDiscountP;
      this.showDiscount = false;
      if (!this.showDiscountP) {
        this.newDevisf.discountp = 0;
      }
    }
    else if (field === 'tva') {
      this.applyTVA = !this.applyTVA;
      this.showDiscount = false;
    }
    this.updateModalHeight(); // Update modal height after changes
  }
  updateFieldStatus(): void {
    if (this.newDevisf.discount) {
      this.showDiscountP = false;
    }
    if (this.newDevisf.discountp) {
      this.showDiscount = false;
    }
  }
  updateModalHeight(): void {
    // Initial height in pixels
    let baseHeight = 570;
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
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId'];
    });
    console.log("Received projectId:", this.projectId);

    // this.newDevisf.project.projectId = this.projectId;
    this.devisfService.getAllStatuss().subscribe(status => {
      this.Status = status;
    });
    this.updateModalHeight(); // Initial call to set the height based on initial values

  }
  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  formatDatec(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const monthNames = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
  onDateChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input) {
      const date = new Date(input.value);
      this.newDevisf.creationDate = this.formatDate(date);
      this.newDevisf.creationDatedemande = this.formatDatec(date); // Mise à jour de creationDatedemande avec la date formatée
    }
  }
  onDateChangeAndUpdateYear(event: Event): void {
    this.onDateChange(event);
    this.updateYear();
  }
  addDevisf(): void {
    if (!this.isAdding) {
      this.isAdding = true;

      if (this.newDevisf && this.projectId) {
        this.devisfService.createDevisf(this.newDevisf, this.projectId).subscribe({
          next: (result) => {
            console.log(this.newDevisf.tva);
            this.closeModal();
            window.location.reload();
            this.isAdding = false;
          },
          error: (error) => {
            console.error('Erreur lors de la création du Devisf', error);
            this.isAdding = false;
          }
        });
      } else {
        console.error('projectId is not defined');
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
  // updateFieldStatus(): void {
  //   // Désactiver le champ de remise en pourcentage si le champ de remise a une valeur
  //   this.disableDiscountP = !!this.newDevisf.discount;
  
  //   // Désactiver le champ de remise si le champ de remise en pourcentage a une valeur
  //   this.disableDiscount = !!this.newDevisf.discountp;
  
 
  // }
  
  updateYear(): void {
    const creationDate = new Date(this.newDevisf.creationDate);
    const year = creationDate.getFullYear().toString();
    this.newDevisf.annee = year;
  console.log(year)
    this.devisfService.generateDevisReference(year).subscribe(
      (refDevis: string) => {
        this.newDevisf.ref_devis = refDevis;
      },
      (error) => {
        console.error('Erreur lors de la génération de la référence du projet : ', error);
      }
    );
  }
  
  generateProjectReference(annee: string): void {
    this.devisfService.generateDevisReference(annee).subscribe(
      (refDevis: string) => {
      this.newDevisf.ref_devis=refDevis;        // Vous pouvez affecter la référence du projet à une propriété de votre composant si nécessaire
        // this.generatedProjectReference = refProjet;
      },
      (error) => {
        console.error('Erreur lors de la génération de la référence du projet : ', error);
      }
    );}
  // get modalHeight(): string {
  //   return this.newDevisf.tva_present ? '700px' : '640px'; // Ajustez les valeurs selon vos besoins
  // }
}