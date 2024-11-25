import { Component, Input, OnInit } from '@angular/core';
import { ElementService } from '../element.service';
import { Element } from '../element';
import { TypeService } from '../../type/type.service';
import { Type } from '../../type/type';

@Component({
  selector: 'app-modalupdateelement',
  templateUrl: './modalupdateelement.component.html',
  styleUrls: ['./modalupdateelement.component.css']
})
export class ModalupdateelementComponent implements OnInit {
  @Input() updatedElement: Element | null = null;
  types: Type[] = [];
  selectedTypeId: number | null = null;

  constructor(private elementService: ElementService, private typeService: TypeService) {}

  ngOnInit() {
    this.typeService.getAllTypes().subscribe(types => {
      this.types = types;
    });

    this.elementService.selectedElementId$.subscribe(elementId => {
      if (elementId) {
        this.elementService.getElementById(elementId).subscribe(element => {
          this.updatedElement = element;
          this.selectedTypeId = element?.type?.id_type || null;
        });
      }
    });
  }

  updateElement() {
    if (!this.elementService.selectedElementId || !this.updatedElement || !this.updatedElement.type) {
      console.error('selectedElementId, updatedElement, or updatedElement.type is null');
      return;
    }

    if (this.selectedTypeId) {
      const selectedType = this.types.find(type => type.id_type === this.selectedTypeId);
      if (selectedType) {
        this.updatedElement.type = selectedType;
      }
    }

    this.elementService.updateElement(this.elementService.selectedElementId, this.updatedElement).subscribe(() => {
      this.closeModalUpdate();
      window.location.reload();
    }, error => {
      console.error('Error updating Element:', error);
    });
  }

  closeModalUpdate() {
    const modalBackgroundupdate = document.getElementById('modalBackgroundupdate');
    if (modalBackgroundupdate) {
      modalBackgroundupdate.style.display = 'none';
    }
  }
}
