import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalitemComponent } from './import-modalitem.component';

describe('ImportModalitemComponent', () => {
  let component: ImportModalitemComponent;
  let fixture: ComponentFixture<ImportModalitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportModalitemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportModalitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
