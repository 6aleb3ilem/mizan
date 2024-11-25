import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdtarifComponent } from './modaladdtarif.component';

describe('ModaladdtarifComponent', () => {
  let component: ModaladdtarifComponent;
  let fixture: ComponentFixture<ModaladdtarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdtarifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdtarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
