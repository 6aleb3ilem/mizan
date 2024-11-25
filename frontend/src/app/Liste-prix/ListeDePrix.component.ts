// ListeDePrixComponent.ts
import { Component, OnInit } from '@angular/core';

import { ListeDePrix } from './listeprix'; // Adjust the import path as needed
import { ListeDePrixService } from './liste-de-prix.service';


@Component({
  selector: 'app-liste-de-prix',
  templateUrl: './liste-de-prix.component.html',
  styleUrls: ['./liste-de-prix.component.css']
})
export class ListeDePrixComponent implements OnInit {
  listeDePrixs: ListeDePrix[] = []; // Use the correct type for your data
  updatedListeDePrix: ListeDePrix = {
    id: 0, // Assuming `id` of 0 or some other value indicates a new or temporary state
    name: '',
    note: '',
    price: 0,
    type: '',
    unit: ''
  };


  constructor(private listeDePrixService: ListeDePrixService) { }

  ngOnInit() {
    this.getListeDePrixs();
  }

  getListeDePrixs(): void {
    this.listeDePrixService.getAllListeDePrix().subscribe(
      (data: ListeDePrix[]) => {
        this.listeDePrixs = data;
      },
      error => {
        console.error("Error fetching data: ", error);
      }
    );
  }
// Inside your ListeDePrixComponent

addListeDePrix(): void {
  const newPrix = {
    name: (document.getElementById('Name') as HTMLInputElement).value,
    note: (document.getElementById('Note') as HTMLInputElement).value,
    price: parseFloat((document.getElementById('Price') as HTMLInputElement).value),
    type: (document.getElementById('Type') as HTMLInputElement).value,
    unit: (document.getElementById('Unit') as HTMLInputElement).value
  };
  // Call the service method to add the new ListeDePrix
  this.listeDePrixService.createListeDePrix(newPrix).subscribe({
    next: (response) => {
      // Handle successful addition
      this.getListeDePrixs(); // Refresh the list or add to the local array
      this.closeModal(); // Close the modal
    },
    error: (error) => {
      console.error('Error adding ListeDePrix: ', error);
    }
  });
}

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

openModalDelete(id: number) {
  this.listeDePrixService.setSelectedId(id);
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
        modalBackgrounddelete.style.display = 'block';
    }
}
closeModalDelete() {
  const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
  if (modalBackgrounddelete) {
    modalBackgrounddelete.style.display = 'none';
  }
}


openModalUpdate(listeDePrixId: number) {
  this.listeDePrixService.getListeDePrixById(listeDePrixId).subscribe({
    next: (listeDePrix) => {
      this.updatedListeDePrix = listeDePrix; // Update the local variable with the fetched ListeDePrix
      const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
      if (modalBackgroundupdate) {
        modalBackgroundupdate.style.display = 'block';
      }
    },
    error: (error) => {
      console.error('Error fetching ListeDePrix:', error);
    }
  });
}


closeModalUpdate() {
  const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
  if (modalBackgroundupdate) {
    modalBackgroundupdate.style.display = 'none';
  }

}
}
