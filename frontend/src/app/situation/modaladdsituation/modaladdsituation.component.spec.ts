import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdsituationComponent } from './modaladdsituation.component';

describe('ModaladdsituationComponent', () => {
  let component: ModaladdsituationComponent;
  let fixture: ComponentFixture<ModaladdsituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdsituationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdsituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
