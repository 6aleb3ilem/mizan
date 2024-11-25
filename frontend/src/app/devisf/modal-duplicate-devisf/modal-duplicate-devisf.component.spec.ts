import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDuplicateDevisfComponent } from './modal-duplicate-devisf.component';

describe('ModalDuplicateDevisfComponent', () => {
  let component: ModalDuplicateDevisfComponent;
  let fixture: ComponentFixture<ModalDuplicateDevisfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDuplicateDevisfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalDuplicateDevisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
