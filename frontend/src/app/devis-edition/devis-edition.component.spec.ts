import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisEditionComponent } from './devis-edition.component';

describe('DevisEditionComponent', () => {
  let component: DevisEditionComponent;
  let fixture: ComponentFixture<DevisEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisEditionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
