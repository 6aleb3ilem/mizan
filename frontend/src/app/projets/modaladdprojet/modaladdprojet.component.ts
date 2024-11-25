// modaladdprojet.component.ts
import { Component, OnInit, ViewChild ,Input} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
import { Project } from '../project'; // Import the Project interface
import { ClientService } from 'src/app/client/client.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Client } from 'src/app/client/client';

@Component({
  selector: 'app-modaladdprojet',
  templateUrl: './modaladdprojet.component.html',
  styleUrls: ['./modaladdprojet.component.css']
})
export class ModaladdprojetComponent implements OnInit {
  isAdding: boolean = false;
  selectedClient: number | null = null;
  searchValue: string = ''; // Déclarer une propriété pour stocker la valeur de recherche
  @Input() dernierProjetId: number = 0;
  generatedProjectReference: string = ''; // Ajoutez une propriété pour stocker la référence générée
  clientDetails:Client={ id: 0, name: '', email: '', telephone: '', address: '', status: {id:0,label:'',tableref:''}, note: '', contacts: [] };
  clients: any[] = []; // Define the clients property
  filteredClients: any[] = []; // Define the clients property

  newProject: Project = { // Define the newProject property
    projectId:0, // Add projectId property
    creationDate: "",
    refProjet:'',
    annee:"",
    projectMO: '',
    projectMOE: '',
    projectBCT: {id:0,label:''},
    status:{id:0,label:'',tableref:''}, situation:{id:0,label:''},
    projectLocation: '',
    title: '',clientId:0,
    client: { id: 0, name: '', email: '', telephone: '', address: '', status: {id:0,label:'',tableref:''}, note: '', contacts: [] }
  };
  Status: any[] = [];
  situation: any[] = [];
  bct: any[] = [];

  constructor(private clientService: ClientService, private projectService: ProjectService, private router: Router) { }
  ngOnInit(): void {
    this.clientService.getAllClients().subscribe(clients => {
      this.clients = clients;
    });
    this.projectService.getAllStatuss().subscribe(status => {
      this.Status = status.filter(status => status.tableref === 'projet'); // Filter here
      console.log(this.Status);
    });
    this.projectService.getAllBCTs().subscribe(bct => {
      this.bct = bct;
    });
    this.projectService.getAllSituations().subscribe(situation => {
      this.situation = situation;
    });
    this.searchValue = ''; // Initialiser searchValue à une chaîne vide
    this.selectedClient = null; // ou une valeur par défaut si approprié

    // Obtenez la date actuelle et formatez-la en 'YYYY-MM-DD'
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    this.newProject.creationDate = formattedDate;
    this.newProject.annee = currentDate.getFullYear().toString();
  
    // Appel asynchrone pour générer la référence du projet
    this.projectService.generateProjectReference(this.newProject.annee).subscribe(
      (refProjet: string) => {
        this.newProject.refProjet = refProjet;
      },
      (error) => {
        console.error('Erreur lors de la génération de la référence du projet : ', error);
      }
    );
  }
  
  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }

  }
  @ViewChild('projectForm') projectForm!: NgForm;
  addProject(): void {
    console.log('Selected Client:', this.selectedClient);

    // if (this.projectForm && !this.projectForm.valid) {
    //     console.log("le client rest n'est pas bien passer");
    //     return;
    // }

    if (!this.selectedClient) {
        // Si aucun client n'est sélectionné, empêchez la soumission du formulaire
        console.error('Aucun client sélectionné.');
        return;
    }

    if (!this.isAdding) {
        this.isAdding = true;
        // Utilisez this.selectedClient pour définir newProject.client
        this.newProject.client.id = this.selectedClient;
        this.projectService.createProject(this.newProject).subscribe(() => {
            // Redirigez ou effectuez toute autre action après l'ajout du contact
            this.router.navigate(['/projets']);
            this.closeModal();
            window.location.reload();
            this.isAdding = false;
        });
    }
}

  
  
  // generateProjectReference(): void {
  //   // Récupérer l'année à partir de la date de création du projet
  //   const creationDate = new Date(this.newProject.creationDate);
  //   const year = creationDate.getFullYear().toString();
  
  //   // Appeler la méthode du service pour générer la référence du projet
  //   this.projectService.generateProjectReference(year).subscribe(
  //     refProjet => {
  //       // Mettre à jour la référence du projet lorsque la valeur est émise
  //       this.newProject.refProjet = refProjet;
  //     },
  //     error => {
  //       console.error('Erreur lors de la génération de la référence du projet :', error);
  //     }
  //   );
  // }
  
updateYear(): void {
  const creationDate = new Date(this.newProject.creationDate);
  const year = creationDate.getFullYear().toString();
  this.newProject.annee = year;

  this.projectService.generateProjectReference(year).subscribe(
    (refProjet: string) => {
      this.newProject.refProjet = refProjet;
    },
    (error) => {
      console.error('Erreur lors de la génération de la référence du projet : ', error);
    }
  );
}

  generateProjectReference(annee: string): void {
    this.projectService.generateProjectReference(annee).subscribe(
      (refProjet: string) => {
      this.newProject.refProjet=refProjet;        // Vous pouvez affecter la référence du projet à une propriété de votre composant si nécessaire
        // this.generatedProjectReference = refProjet;
      },
      (error) => {
        console.error('Erreur lors de la génération de la référence du projet : ', error);
      }
    );
  }
 
  
highlightSelectedClient(clientName: string): void {
  const clientListBox = document.getElementById("clientListBox");
  if (clientListBox) {
    const divs = clientListBox.getElementsByTagName('div');
    for (let i = 0; i < divs.length; i++) {
      divs[i].classList.remove('selected');
      if (divs[i].textContent === clientName) {
        divs[i].classList.add('selected');
      }
    }
    clientListBox.style.display = 'none';
  }
}


  // Méthode pour afficher la liste de clients lors du clic sur le champ de recherche
  showClientList(): void {
    const clientListBox = document.getElementById("clientListBox");
    if (clientListBox) {
      clientListBox.style.display = 'block';
      this.filterClients();
    }
  }




  // Méthode pour filtrer les clients en fonction de la saisie de l'utilisateur
  filterClients(): void {
    let searchTerm = this.searchValue.trim().toUpperCase();

    // Si la valeur de recherche est vide, réinitialiser la liste des clients filtrés
    if (!searchTerm) {
      this.filteredClients = [];
      return;
    }

    // Mettre en majuscules la valeur de recherche
    searchTerm = searchTerm.toUpperCase();

    // Filtrer les clients en fonction du nom du client contenant la valeur de recherche
    this.filteredClients = this.clients.filter(client =>
      client.name.toUpperCase().includes(searchTerm)
    );
}


  // Méthode pour sélectionner un client
  selectClient(client: Client): void {
    this.selectedClient = client.id; // Mettre à jour la propriété liée avec ngModel
    this.updateClientSelect(client.name); // Mettre à jour l'affichage
    // ...
  }
  
  // Méthode pour mettre à jour l'affichage de la sélection de client
  updateClientSelect(clientName: string): void {
    const clientSelectElement = document.getElementById('ClientProjet') as HTMLSelectElement;
    // Trouver et sélectionner l'option qui correspond au client sélectionné
    for (let i = 0; i < clientSelectElement.options.length; i++) {
      if (clientSelectElement.options[i].text === clientName) {
        clientSelectElement.selectedIndex = i;
        break;
      }
    }
    // Cachez la liste de clients filtrée
    const clientListBox = document.getElementById('clientListBox');
    if (clientListBox) {
      clientListBox.style.display = 'none';
    }
  }
}
