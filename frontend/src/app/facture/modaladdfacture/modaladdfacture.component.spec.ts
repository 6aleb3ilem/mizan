import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdfactureComponent } from './modaladdfacture.component';

describe('ModaladdfactureComponent', () => {
  let component: ModaladdfactureComponent;
  let fixture: ComponentFixture<ModaladdfactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdfactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdfactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
