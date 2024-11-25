import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateconditionPComponent } from './modalupdatecondition-p.component';

describe('ModalupdateconditionPComponent', () => {
  let component: ModalupdateconditionPComponent;
  let fixture: ComponentFixture<ModalupdateconditionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdateconditionPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdateconditionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
