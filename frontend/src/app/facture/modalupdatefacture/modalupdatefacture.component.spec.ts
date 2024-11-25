import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatefactureComponent } from './modalupdatefacture.component';

describe('ModalupdatefactureComponent', () => {
  let component: ModalupdatefactureComponent;
  let fixture: ComponentFixture<ModalupdatefactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdatefactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdatefactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
