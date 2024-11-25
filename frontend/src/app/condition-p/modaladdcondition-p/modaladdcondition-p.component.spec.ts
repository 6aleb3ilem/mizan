import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdconditionPComponent } from './modaladdcondition-p.component';

describe('ModaladdconditionPComponent', () => {
  let component: ModaladdconditionPComponent;
  let fixture: ComponentFixture<ModaladdconditionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdconditionPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdconditionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
