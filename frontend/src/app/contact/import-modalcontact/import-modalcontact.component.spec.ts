import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalcontactComponent } from './import-modalcontact.component';

describe('ImportModalcontactComponent', () => {
  let component: ImportModalcontactComponent;
  let fixture: ComponentFixture<ImportModalcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportModalcontactComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportModalcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
