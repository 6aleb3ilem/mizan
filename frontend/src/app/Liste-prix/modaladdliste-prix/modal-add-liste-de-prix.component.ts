import { Component } from '@angular/core';
import { ListeDePrix } from '../listeprix';
import { ListeDePrixService } from '../liste-de-prix.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-modal-add-liste-de-prix',
  templateUrl: './modal-add-liste-de-prix.component.html',
  styleUrls: ['./modal-add-liste-de-prix.component.css']
})
export class ModalAddListeDePrixComponent {
  isAdding: boolean = false;

  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }
  newListeDePrix: ListeDePrix = { // Initialize with appropriate default values
    id: 0, // Assuming id is auto-generated, you might not need to set it here
    name: '',
    note: '',
    price: 0, // Use the appropriate type, e.g., number or null if it's optional
    type: '',
    unit: '',
    // Any other properties required by your ListeDePrix model
  };

  constructor(private listeDePrixService: ListeDePrixService,private router: Router) {}





  addListeDePrix(): void {
    this.listeDePrixService.createListeDePrix(this.newListeDePrix).subscribe({
      next: (response) => {
        console.log('Liste De Prix added successfully', response);
        this.router.navigate(['/Listprix']);

        this.closeModal();
        window.location.reload();
        // Optionally, refresh the list or perform additional actions
      },
      error: (error) => {
        console.error('Error adding Liste De Prix:', error);
      }
    });

  }
}
