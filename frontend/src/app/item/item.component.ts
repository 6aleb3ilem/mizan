
// item.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import * as XLSX from 'xlsx';import { ItemService } from './item.service';
import { Item } from './item';
import { ActivatedRoute } from '@angular/router';
import { Unite } from './unite';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit{
  ItemIdToUpdate: number | undefined;
  TaskId: number | undefined;
  ElementId: number | undefined;
unite?:Unite
  Items: Item[] = [];
  listeDePrix: any[] = [];
  updatedItem: Item | undefined;
   // Injectez le service Router ici
    constructor(private ItemService: ItemService,  private authService: AuthService,private route:ActivatedRoute) {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.TaskId = +params['taskId']; // Récupérer l'ID de la tâche depuis l'URL
      const ElementId = +params['elementId']; // Récupérer l'ID de la tâche depuis l'URL
      console.log("ElementId   "+ ElementId + "TaskId  " + this.TaskId)
      this.loadItemsByTaskId(this.TaskId);
    });
  }

  loadItemsByTaskId(TaskId: number): void {
    this.ItemService.getItemsByTaskId(TaskId).subscribe(items => {
      this.Items = items;
      this.dataSource.data = items;
      this.paginatedData = this.Items.slice(0, 5); 
      console.log(this.Items);
      console.log(this.paginateData)

    });
  }

  // loadlisteDePrix(): void {
  //   this.ItemService.getAlllisteDePrixs().subscribe(listeDePrix => {
  //     this.listeDePrix = listeDePrix;
  //   });
  // }
  UniteById(id:number): void {
    this.ItemService.getUniteById(id).subscribe(unite => {
      this.unite = unite;
    });
  }
  paginatedData: Item[] = [];
  dataSource = new MatTableDataSource<Item>();
  displayedColumns: string[] = ['id', 'refEdevis', 'elementNote','elementQty','elementStatus'];


  

  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  sortBy: string = '';
  sortDirection: string = 'asc';
  sortData(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    
    // Tri des données selon le critère sélectionné
    if (sortBy === 'refEdevis') {
      this.Items.sort((a, b) => {
        if (a.refEdevis < b.refEdevis) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.refEdevis > b.refEdevis) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'elementNote') {
      this.Items.sort((a, b) => {
        if (a.elementNote < b.elementNote) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.elementNote > b.elementNote) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } else if (sortBy === 'elementQty') {
      this.Items.sort((a, b) => {
        if (a.elementQty < b.elementQty) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.elementQty > b.elementQty) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    } // Ajoutez d'autres cas pour d'autres critères de tri si nécessaire
    else if (sortBy === 'elementStatus') {
      this.Items.sort((a, b) => {
        if (a.status.label < b.status.label) return this.sortDirection === 'asc' ? -1 : 1;
        if (a.status.label > b.status.label) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    // Mise à jour des données paginées après le tri
    this.paginateData();
  }
  paginateData() {
    // Réappliquer la pagination sur les données triées
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedData = this.Items.slice(startIndex, endIndex);
  }
  onPageChange(event: PageEvent): void {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.paginatedData = this.Items.slice(startIndex, endIndex);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.dataSource.filter = filterValue;
  
  // Apply filter to paginatedData
  this.paginatedData = this.Items.filter(item => {
    return item.id.toString().includes(filterValue) ||
     item.elementQty.toString().includes(filterValue)|| 
     item.elementNote.toLowerCase().includes(filterValue)|| 
     item.status.label.toString().includes(filterValue)|| 
     item.qteLots.toString().includes(filterValue)|| 
     item.refEdevis.toLowerCase().includes(filterValue) 
     ;
  });

  // If paginator exists, reset to the first page
  if (this.paginator) {
    this.paginator.firstPage();
  }
}

exportToExcel(): void {
  // Step 1: Create a JSON array with the same structure as your items
  const dataToExport = this.Items.map(item => ({
    id: item.id,
          name: item.name,
          elementNote: item.elementNote,
          nbreLots:item.nbreLots,
          qteLots:item.qteLots,
          elementQty: item.elementQty,
          elementStatus: item.status.label,
          refEdevis: item.refEdevis,
          elementid: item.elementid,
          taskid: this.TaskId,
          prix_unitaire: item.prix_unitaire,
          montant: item.montant,
          unite: item.unite,
          type: item.type,      
    // ... include all other properties that you want to export
  }));

  // Step 2: Convert the JSON array to worksheet
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport);

  // Step 3: Create a workbook and add the worksheet
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');

  // Step 4: Export the workbook
  XLSX.writeFile(workbook, 'ItemsExport.xlsx');
}


  openImportModal(): void {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
    console.log(this.ElementId,this.TaskId)
  }
  closeModalimp() {
    const modalBackground = document.getElementById('importModalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
    //createitem(item: Item): void {

    // if (this.ItemIdToUpdate) {
    //   this.ItemService.createItem(item, this.ItemIdToUpdate).subscribe(() => {
    //      // Handle success, e.g., show a success message or navigate to another page
    //   }, error => {
    //     console.error('Error creating item:', error);
    //     // Handle error, e.g., show an error message
    //    });
    // } else {
    //   console.error('Please select a client');
    //  // Handle case where no client is selected
    //  }

  // }

  openModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'block';
    }
  }

  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  openModalUpdate(ItemId: number) {
    this.ItemService.selectedItemId = ItemId;
    this.ItemService.getItemById(ItemId).subscribe(Item => {
        this.updatedItem = Item;
        const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
        if (modalBackgroundupdate) {
            modalBackgroundupdate.style.display = 'block';
        }
    });

  }


  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }


  }
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }

  selectedItemId: number | null = null;

  openModalDelete(ItemId: number) {
    this.ItemService.selectedItemId = ItemId;
      const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
      if (modalBackgrounddelete) {
          modalBackgrounddelete.style.display = 'block';
      }
  }
  isAdmin(): boolean {
    const roles = this.authService.getUserRoles();
    return roles.includes('ADMIN') || roles.includes('SUPERADMIN');
  }
}
