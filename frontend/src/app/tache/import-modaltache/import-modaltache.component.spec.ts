import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModaltacheComponent } from './import-modaltache.component';

describe('ImportModaltacheComponent', () => {
  let component: ImportModaltacheComponent;
  let fixture: ComponentFixture<ImportModaltacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportModaltacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportModaltacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
