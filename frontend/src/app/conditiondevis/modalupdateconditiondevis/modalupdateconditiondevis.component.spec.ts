import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateconditiondevisComponent } from './modalupdateconditiondevis.component';

describe('ModalupdateconditiondevisComponent', () => {
  let component: ModalupdateconditiondevisComponent;
  let fixture: ComponentFixture<ModalupdateconditiondevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdateconditiondevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdateconditiondevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
