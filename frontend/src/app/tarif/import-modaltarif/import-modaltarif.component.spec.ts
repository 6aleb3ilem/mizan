import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModaltarifComponent } from './import-modaltarif.component';

describe('ImportModaltarifComponent', () => {
  let component: ImportModaltarifComponent;
  let fixture: ComponentFixture<ImportModaltarifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportModaltarifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportModaltarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
