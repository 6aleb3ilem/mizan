import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalprojetComponent } from './import-modalprojet.component';

describe('ImportModalprojetComponent', () => {
  let component: ImportModalprojetComponent;
  let fixture: ComponentFixture<ImportModalprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportModalprojetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportModalprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
