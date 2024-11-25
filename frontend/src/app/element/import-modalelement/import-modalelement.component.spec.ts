import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalelementComponent } from './import-modalelement.component';

describe('ImportModalelementComponent', () => {
  let component: ImportModalelementComponent;
  let fixture: ComponentFixture<ImportModalelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportModalelementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportModalelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
