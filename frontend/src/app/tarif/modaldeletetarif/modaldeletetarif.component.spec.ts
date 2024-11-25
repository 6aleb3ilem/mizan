import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletetarifComponent } from './modaldeletetarif.component';

describe('ModaldeletetarifComponent', () => {
  let component: ModaldeletetarifComponent;
  let fixture: ComponentFixture<ModaldeletetarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletetarifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletetarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
