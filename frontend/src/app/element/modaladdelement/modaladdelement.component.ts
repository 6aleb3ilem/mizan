import { Component, OnInit } from '@angular/core';
import { ElementService } from '../element.service';
import { Router } from '@angular/router';
import { Element } from '../element';
import { Type } from '../../type/type';

@Component({
  selector: 'app-modaladdelement',
  templateUrl: './modaladdelement.component.html',
  styleUrls: ['./modaladdelement.component.css']
})
export class ModaladdelementComponent implements OnInit {
  isAdding: boolean = false;
  types: Type[] = [];
  newElement: Element = {
    id: 0,
    name: '',
    type: null,
    note: ''
  };

  constructor(private elementService: ElementService, private router: Router) { }

  ngOnInit(): void {
    this.elementService.getAllTypes().subscribe(types => {
      this.types = types;
    });
  }

  closeModal() {
    const modalBackground = document.getElementById('modalBackground');
    if (modalBackground) {
      modalBackground.style.display = 'none';
    }
  }

  addElement(): void {
    console.log('Element to be sent:', this.newElement);
    if (!this.isAdding) {
      this.isAdding = true;
      this.elementService.createElement(this.newElement).subscribe({
        next: () => {
          this.router.navigate(['/element']); // Assurez-vous que le chemin est correct
          this.closeModal();
          window.location.reload();
        },
        error: (error) => {
          alert(error.message); // Affiche le message d'erreur
          this.isAdding = false; // Reset du flag
        }
      });
    }
  }
  
}
