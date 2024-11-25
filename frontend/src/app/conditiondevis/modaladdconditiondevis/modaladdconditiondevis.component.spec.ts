import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdconditiondevisComponent } from './modaladdconditiondevis.component';

describe('ModaladdconditiondevisComponent', () => {
  let component: ModaladdconditiondevisComponent;
  let fixture: ComponentFixture<ModaladdconditiondevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdconditiondevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdconditiondevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
