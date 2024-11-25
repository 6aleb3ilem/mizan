import { Type } from './../type/type';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DevisService } from '../devis/devis.service';
import { Devis } from '../devis/devis';
import { Item } from '../item/item';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';import { Tache } from '../tache/tache';
// import { FilterByTypePipe } from '../filter-by-type.pipe';
import { ElementService } from '../element/element.service';
// import html2pdf from 'html2pdf.js';
// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ReportService } from './report.service'
// import html2canvas from "html2canvas";
import { DevistacheService } from '../devistache/devistache.service'; // Ajustez le chemin selon votre structure
import { TacheService } from '../tache/tache.service';
import { ProjectClientDTO } from '../devis/projectclientdto';
@Component({
  selector: 'app-devis-edition',
  templateUrl: './devis-edition.component.html',
  styleUrls: ['./devis-edition.component.css']
})
export class DevisEditionComponent implements OnInit {
  devis: Devis | null = null; // ou utilisez une valeur par défaut appropriée
  projectName: string | null = null;
  clientName: string | null = null;
  remise?:string;
  remisel?:string;
adddevis:Devis= {
  montantRemise:0,
  montantTva:0,
  montant:0,
  ref_devis:'',
  devisId: 0,discountp:0,
 
  annee:'',
  creationDate:'',

  tva:16,
  tva_present:false,
  discount:0,date:'',note:'',status:{id:0,label:'',tableref:''},
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
  remiserapport:''
};

  tasks: Tache[] | null = null; // Ajoutez une propriété pour stocker les noms de tâches
  elementDevisList: { [taskName: string]: Item[] } = {}; // Utilisation d'un objet pour stocker les éléments de devis par nom de tâche
  types: Type[] = [];
  typesWithCounts: { type: Type; details: Item[]; count?: number }[] = [];
  taskTotalAmounts: { [taskName: string]: number } = {}; // Variable pour stocker les montants totaux par tâche
  totalDevisAmount: number = 0; // Variable pour stocker le montant total du devis
 devisId:number=0;
  constructor(private route: ActivatedRoute, private devisService: DevisService,    private elementService: ElementService // Injectez le service ElementService dans le constructeur
  ,    private devistacheService: DevistacheService, private tacheService: TacheService,private cdRef: ChangeDetectorRef, private httpClient: HttpClient, private reportService:ReportService
  ) { }
  get concatenatedTaskNames(): string {
    if (this.tasks && this.tasks.length) {
      const taskNames = this.tasks.map(task => task.taskName).join(' - ');
      return `${taskNames} - `;
    }
    return this.projectName || '';
  }
  ngOnInit(): void {
    
    this.devisService.getAllTypes().subscribe((types: Type[]) => {
      this.types = types;
      this.loadTypesWithDetails();
    });
  
    this.route.paramMap.subscribe(params => {
       this.devisId = parseInt(params.get('devisId') || '');
      if (!isNaN(this.devisId)) {
        this.devisService.getDevisById(this.devisId).subscribe(devis => {
          this.devis = devis;
      //     this.projectName = params.get('projectName');
      //     this.clientName = params.get('clientName');
      // const devisId = parseInt(params.get('devisId') || '');
      const projectId = parseInt(params.get('projectId') || '');

          // Maintenant que nous avons le nom du projet, appelons la méthode pour obtenir les noms de tâches
          // if (this.projectName) {
          //   this.devisService.getTaskNamesByProjectName(this.projectName).subscribe(taskNames => {
          //     this.taskNames = taskNames;
          //     this.taskNames.forEach(taskName => {
          //       this.loadElementsDevisByTaskName(taskName);
          //       console.log(this.loadElementsDevisByTaskName(taskName))
          //     });
              
          //   });
          // }


          // if (projectId) {
// Appeler getProjectAndClientNames pour récupérer les noms du projet et du client
this.devisService.getProjectAndClientNames(this.devisId).subscribe((data: ProjectClientDTO) => {
  this.projectName = data.projectName;
  this.clientName = data.clientName;
});
            this.devistacheService.getTasksByDevisId(this.devisId).subscribe(tasks => {
              this.tasks = tasks;
              console.log(this.tasks )
              this.tasks.forEach(task => {
                this.loadElementsDevisByTaskId(task.taskId);
                console.log(this.loadElementsDevisByTaskId(task.taskId))
              });
            });
          // }
        }
      );
      }
    });
  }
  openDevisReport(devisId: number): void {
    this.reportService.generateDevisReport(devisId);
  }
  firstElementDevis: Item | null = null; // Déclaration de la variable au niveau de la classe
  typeED: string | null = null;

  loadElementsDevisByTaskName(taskName: string): void {
    this.devisService.getElementsDevisByTaskName(taskName).subscribe(elements => {
      if (elements && elements.length > 0) {
        this.elementDevisList[taskName] = elements;
        this.cdRef.detectChanges(); // Appeler detectChanges ici

        this.firstElementDevis = elements[0]; // Stocker le premier élément dans la variable
        this.typeED=this.firstElementDevis!.type;
        this.cdRef.detectChanges(); // Appeler detectChanges ici

      } else {
        // Gérer le cas où aucun élément n'est retourné
        this.firstElementDevis = null;
      }
      this.cdRef.detectChanges(); // Ici, après la mise à jour des données

    });
  }
  loadElementsDevisByTaskId(taskId: number): void {
    this.devisService.getElementDevisByTaskId(taskId).subscribe(elements => {
      if (elements && elements.length > 0) {
        this.elementDevisList[taskId] = elements;
        this.cdRef.detectChanges(); // Appeler detectChanges ici

        this.firstElementDevis = elements[0]; // Stocker le premier élément dans la variable
        this.typeED=this.firstElementDevis!.type;
        this.cdRef.detectChanges(); // Appeler detectChanges ici

      } else {
        // Gérer le cas où aucun élément n'est retourné
        this.firstElementDevis = null;
      }
      this.cdRef.detectChanges(); // Ici, après la mise à jour des données

    });
  }
  
  loadTypesWithDetails() {
    this.devisService.getAllTypes().subscribe(types => {
      // Pour chaque type, charger les détails (en incluant un exemple fictif de méthode getDevisDetailsByType)
      const detailsObservables = types.map(type =>
        this.devisService.getDevisDetailsByType(type.label).pipe(
          map(details => ({
            type: type,
            details: details // Supposons que cela renvoie à la fois le nombre et les éléments de devis
          }))
        )
      );
  
      forkJoin(detailsObservables).subscribe(typesWithDetails => {
        this.typesWithCounts = typesWithDetails;
      });
    });
  }

  
  // calculateTaskTotal(taskName: string): number {
  //   let totalAmount = 0;
  //   const elements = this.elementDevisList[taskName];
  //   let task: Tache | undefined; // Déclaration de la variable task
  
  //   if (this.tasks !== null) {
  //     task = this.tasks.find(task => task.taskName === taskName);
  //   }
  
  //   if (elements) {
  //     for (const element of elements) {
  //       totalAmount += element.montant;
  //     }
  //   }
  
  //   if (task) {
  //     task.montant = totalAmount;
  //     console.log(task.montant+'t');

  //   }
  
  //   return totalAmount;
  // }
  
  // calculateTaskTotal(taskName: string): number {
  //   let totalAmount = 0;
  //   const elements = this.elementDevisList[taskName];
  //   let task: Tache | undefined;

  //   if (this.tasks !== null) {
  //     task = this.tasks.find(task => task.taskName === taskName);
  //   }

  //   if (elements) {
  //     for (const element of elements) {
  //       if (element.status.label !== 'PM') {
  //         totalAmount += element.montant;
  //       }      }
  //   }

 

  //   return totalAmount;
  // }


  // calculateDevisTotal(): number {
  //   let devisTotal: number = 0;
  //   if (this.tasks) {
  //     this.tasks.forEach((task: Tache) => {
  //       devisTotal += this.calculateTaskTotal(task.taskName);
  //     });
  //   }
  //   return devisTotal;
  // }


  // calculateTotalDevis(): void {
  //   this.totalDevisAmount = 0; // Réinitialiser le montant total
  //   for (const task of this.tasks) {
  //     this.totalDevisAmount += this.calculateTaskTotal(task.taskName);
  //   }
//   // }
//   exportDevisToPDF(): void {
//     const element = document.getElementById('devis-content');
//     const montant_ht = this.calculateDevisTotal();
    
//     const mont_ttc = this.calculateDevisTotalTTC();
//     let montant_remise = 0;
//     const devisId = this.devisId;

//     if (this.devis!.discountp) {
//         montant_remise = (this.devis!.discountp / 100) * montant_ht;
//     } else if (this.devis!.discount) {
//         montant_remise = this.devis!.discount;
//     }
//     console.log(" montant ht: " + montant_ht);
//     console.log(" montant ttc: " + mont_ttc);
//     console.log(" montant remise: " + montant_remise);

//     // Mettre à jour le montant_remise dans l'objet adddevis

//     if (element) {
//         let htmlContent = `<html><body>${element.innerHTML}</body></html>`;
//         htmlContent = htmlContent.replace(/<img([^>]+)>/gi, "<img$1/>");
//         this.httpClient.post('http://localhost:8082/api/devis/pdf/generate', { htmlContent: htmlContent }, { responseType: 'blob' })
//             .subscribe((res: Blob) => {
//                 const file = new Blob([res], { type: 'application/pdf' });
//                 const fileURL = URL.createObjectURL(file);
//                 window.open(fileURL);

//                 // Une fois le PDF généré, mettre à jour le devis
//                 this.devisService.updateDevis(devisId, this.adddevis)
//                     .subscribe(() => {
//                         console.log('Devis updated with montant_Remise:', this.adddevis);
//                     }, error => {
//                         console.error('Failed to update devis with montant_Remise:', error);
//                     });
//             }, error => console.error('Failed to generate PDF', error));
//     } else {
//         console.error('Failed to find the element with ID "devis-content".');
//     }
// }

    
    // calculateDevisTotalWithDiscount(): number {
    //   let devisTotal = this.calculateDevisTotal(); // Utilisez votre méthode existante pour obtenir le total initial
    
    //   // Vérifiez si le discountp (remise en pourcentage) est appliqué
    //   if (this.devis && this.devis.discountp > 0) {
    //     // Calcul du total après l'application de la remise en pourcentage
    //     this.remise=(devisTotal * this.devis.discountp) / 100+'%';
    //     devisTotal -= (devisTotal * this.devis.discountp) / 100;
    //   }
    //   // Sinon, vérifiez si le discount (remise fixe) est appliqué
    //   else if (this.devis && this.devis.discount > 0) {
    //     this.remise=(this.devis.discount).toString
    //     devisTotal -= this.devis.discount;
    //   }
 
    //   return devisTotal;
    // }
    

    // calculateDevisTotalWithDiscount(): number {

    //   let devisTotal = this.calculateDevisTotal(); // Use your existing method to get the initial total
    //   this.remisel='REMISE de';

    //   // Check if a percentage discount (discountp) is applied
    //   if (this.devis && this.devis.discountp > 0) {
    //     this.remisel+=this.devis.discountp+'%';
    //     // Calculate the total after applying the percentage discount
    //     let discountAmount = (devisTotal * this.devis.discountp) / 100;
    //     this.remise = discountAmount.toFixed(2) + ' (' + this.devis.discountp + '%)';
    //     devisTotal -= discountAmount;
    //   }
    //   // Otherwise, check if a fixed discount (discount) is applied
    //   else if (this.devis && this.devis.discount > 0) {
    //     this.remisel+=this.devis.discount;

    //     this.remise = this.devis.discount.toFixed(2); // Call toFixed() for consistent formatting
    //     devisTotal -= this.devis.discount;
    //   }
    //   else {
    //     // If no discount is applied, ensure remise is cleared
    //     this.remise = '';
    //   }
    
    //   return devisTotal;
    // }
    // updateDevisIfChanged(): void {
    //   const updatedValues: Partial<Devis> = {};
    //   const currentDevisTotal = this.calculateDevisTotal();
    //   const currentDevisTotalWithDiscount = this.calculateDevisTotalWithDiscount();
    //   const currentDevisTTC = this.calculateDevisTotalTTC();
    
    //   // Check and set MONTANT TOTAL EN MRU HT
    //   if (this.devis!.montant_ht !== currentDevisTotal) {
    //     updatedValues.montant_ht = currentDevisTotal;
    //   }
    
    //   // Check and set MONTANT APRES REMISE
    //   if (this.devis!.montant_remise !== currentDevisTotalWithDiscount) {
    //     updatedValues.montant_remise = currentDevisTotalWithDiscount;
    //   }
    
    //   // Check and set MONTANT TOTAL TTC
    //   if (this.devis!.montant_TTC !== currentDevisTTC) {
    //     updatedValues.montant_TTC = currentDevisTTC;
    //   }
    
    //   // If there are updates, send a PUT request
    //   if (Object.keys(updatedValues).length > 0 && this.devis?.devisId) {
    //     this.devisService.updateDevis(this.devis!.devisId, updatedValues).subscribe({
    //       next: (updated) => {
    //           console.log('Devis updated:', updated);
    //           // Refresh the local `devis` object if necessary
    //           this.devis = {...this.devis, ...updated};
    //       },
    //       error: (err) => console.error('Failed to update devis', err)
    //   });
      
    //   }
    // }
    
    // calculateDevisTotalTTC(): number {
    //   const baseTotal = this.calculateDevisTotal();
    //   const bb =baseTotal + (baseTotal * ((this.devis?.tva ?? 0) / 100));
    //   return bb
    // }
    

  }
  
  
  