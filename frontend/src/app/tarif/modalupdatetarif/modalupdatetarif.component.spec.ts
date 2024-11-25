import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatetarifComponent } from './modalupdatetarif.component';

describe('ModalupdatetarifComponent', () => {
  let component: ModalupdatetarifComponent;
  let fixture: ComponentFixture<ModalupdatetarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatetarifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatetarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
