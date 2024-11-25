import { Component , OnInit} from '@angular/core';
import { ItemService } from '../item.service';
import { Item } from '../item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modaldeleteitem',
  templateUrl: './modaldeleteitem.component.html',
  styleUrls: ['./modaldeleteitem.component.css']
})
export class ModaldeleteitemComponent {
  constructor(private ItemService: ItemService,private router: Router) {}
  ItemToDeleteId: number | undefined;
  closeModalDelete() {
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if  (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }

  deleteItem() {
    if (this.ItemService.selectedItemId) {
      this.ItemService.deleteItemById(this.ItemService.selectedItemId).subscribe({
        next: () => {
          console.log('Item deleted successfully');
          this.closeModalDelete(); // Close modal after deletion
          window.location.reload(); // Consider using Angular router instead of window.location.reload
        },
        error: (error) => {
          console.error('Error deleting Item:', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      });
    }
  }
  
}