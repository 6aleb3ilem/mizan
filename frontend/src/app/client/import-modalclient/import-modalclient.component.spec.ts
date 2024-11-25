import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalclientComponent } from './import-modalclient.component';

describe('ImportModalclientComponent', () => {
  let component: ImportModalclientComponent;
  let fixture: ComponentFixture<ImportModalclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportModalclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportModalclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
