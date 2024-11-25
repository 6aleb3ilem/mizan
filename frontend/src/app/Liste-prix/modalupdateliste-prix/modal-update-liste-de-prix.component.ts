import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ListeDePrix } from '../listeprix';
import { ListeDePrixService } from '../liste-de-prix.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-update-liste-de-prix',
  templateUrl: './modal-update-liste-de-prix.component.html',
  styleUrls: ['./modal-update-liste-de-prix.component.css']
})
export class ModalUpdateListeDePrixComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  updatedListeDePrix: ListeDePrix = { id: 0, name: '', note: '', price: 0, type: '', unit: '' };

  constructor(private listeDePrixService: ListeDePrixService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.listeDePrixService.selectedId$.subscribe(id => {
      if (id) {
        this.listeDePrixService.getListeDePrixById(id).subscribe({
          next: (listeDePrix) => {
            this.updatedListeDePrix = listeDePrix;
          },
          error: (error) => console.error('Error fetching ListeDePrix:', error),
        });
      }
    });
  }

  updateListeDePrix(): void {
    if (this.updatedListeDePrix && this.updatedListeDePrix.id) {
      this.listeDePrixService.updateListeDePrix(this.updatedListeDePrix.id, this.updatedListeDePrix).subscribe({
        next: () => {
          console.log('Liste De Prix updated successfully');
          this.router.navigate(['/Listprix']);
          this.closeModalUpdate();
        },
        error: (error) => {
          console.error('Error updating Liste De Prix:', error);
        }
      });
    }
  }

  closeModalUpdate(): void {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
