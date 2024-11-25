import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListeDePrixService } from '../liste-de-prix.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modaldeleteliste-de-prix',
  templateUrl: './modaldeleteliste-de-prix.component.html',
  styleUrls: ['./modaldeleteliste-de-prix.component.css']
})
export class ModalDeleteListeDePrixComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  selectedId: number | null = null;

  constructor(private listeDePrixService: ListeDePrixService,private router: Router) {}

  ngOnInit(): void {
    // Subscribe to the selectedId observable to get the ID of the item to delete
    this.subscription = this.listeDePrixService.selectedId$.subscribe(id => {
      this.selectedId = id;
    });
  }

  // Use the component's selectedId for deletion
  deleteListeDePrix(): void {
    if (this.selectedId != null) { // Check if selectedId is not null
      this.listeDePrixService.deleteListeDePrix(this.selectedId).subscribe({
        next: () => {
          // Handle successful deletion
          // Optionally, emit an event or call a method to refresh the list of items

          this.router.navigate(['/Listprix']);

          this.closeModalDelete();
          window.location.reload();
        },
        error: (error) => console.error('Error deleting ListeDePrix:', error)
      });
    } else {
      console.error('Deletion attempted with an undefined selectedId');
    }
  }

  closeModalDelete(): void {
    // Consider using Angular's structural directives or component property bindings for showing/hiding modals
    const modalBackgrounddelete = document.getElementById('modalBackgrounddelete');
    if (modalBackgrounddelete) {
      modalBackgrounddelete.style.display = 'none';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe(); // Clean up the subscription
  }
}
