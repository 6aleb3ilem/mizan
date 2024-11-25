
  import { Component, Input, OnInit } from '@angular/core';
  import { ConditiondevisService } from '../conditiondevis.service';
  import { conditionPService } from '../../condition-p/condition-p.service';
  import { conditionP } from '../../condition-p/conditionP';
  import { Conditiondevis } from '../conditiondevis';
@Component({
  selector: 'app-modaladdconditiondevis',
  templateUrl: './modaladdconditiondevis.component.html',
  styleUrl: './modaladdconditiondevis.component.css'
})
export class ModaladdconditiondevisComponent {

    @Input() devisId!: number;
    conditionps: conditionP[] = [];
    newConditiondevis: Conditiondevis = {
      id: 0,
      devis: { ref_devis:'',
      devisId: 0,discountp:0,
      montant: 0,
      montantRemise: 0,
      montantTva: 0,
      annee:'',
      creationDate:'',
  
      tva:16,
      tva_present:false,
      project: {clientId:0, 
        projectId: 0, 
        creationDate: '',
        annee:'',
    projectMO: '',
    projectMOE: '',
    projectBCT: {id:0,label:''},
    status:{id:0,label:'',tableref:''}, situation:{id:0,label:''},
    projectLocation: '',
    title: '',
    refProjet:'',
    client: {
      id: 0, // Make id optional
      name: '',
      email: '',
      telephone: '',
      address: '',
      status: {id:0,label:'',tableref:''},
      note: '',
      contacts: [],
      },
    },discount:0,date:'',note:'',status:{id:0,label:'',tableref:''},tache:{
      taskId: 0,
    taskName: '',
    start: '',
    deadline: '',
    priority: {id:0,label:''},
    note: '',
    status: {id:0,label:'',tableref:''},   
    project: 0,
    refTask:"",
    montant:0,
    totalTask:0}
      },
      conditionp: {id: 0, label:'' }
    };
    
    isAdding: boolean = false;
  
    constructor(private conditiondevisService: ConditiondevisService, private conditionpService: conditionPService) {}
  
    ngOnInit(): void {
      console.log("Received devisId:", this.devisId);
      this.newConditiondevis.devis.devisId = this.devisId;
      this.conditiondevisService.getAllconditionPs().subscribe((conditionps) => {
        this.conditionps = conditionps;
        // Sélectionnez le premier conditionp comme par défaut si la liste n'est pas vide
        if (this.conditionps && this.conditionps.length > 0) {
          this.newConditiondevis.conditionp.id = this.conditionps[0].id;
        }
      });
    }
    
  //   submitconditionpdevis() {
  //     this.addconditionpdevis();
  // }
  // onPrincipalChange() {
  //   // Réinitialiser l'avertissement si la checkbox est décochée
  //   if (!this.newConditiondevis.isPrincipal) {
  //     this.showPrincipalExistsWarning = false;
  //     return;
  //   }
  
  //   // Vérifier l'existence d'un tarif principal si la checkbox est cochée
  //   if (this.newConditiondevis.isPrincipal) {
  //     this.conditiondevisService.checkPrincipalconditionPExistsForDevis(this.devisId).subscribe(exists => {
  //       console.log('Existe un conditionp principal dans n’importe quelle devis:', exists);
  //       this.showPrincipalExistsWarning = exists;  // Affiche ou cache l'avertissement basé sur l'existence d'un tarif principal
  //     });
  //   }
  // }
  
  showPrincipalExistsWarning = false;
  
  
    
  addconditionpdevis(): void {
    if (!this.isAdding) {
      this.isAdding = true;
      this.newConditiondevis.devis.devisId = this.devisId; // Assurez-vous que l'ID est défini ici
      if (this.newConditiondevis.devis.devisId) {
        this.conditiondevisService.createConditiondevis(this.newConditiondevis).subscribe({
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
        console.error('devisId is not defined');
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