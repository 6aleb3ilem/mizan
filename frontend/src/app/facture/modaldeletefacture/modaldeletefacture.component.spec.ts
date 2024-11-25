import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletefactureComponent } from './modaldeletefacture.component';

describe('ModaldeletefactureComponent', () => {
  let component: ModaldeletefactureComponent;
  let fixture: ComponentFixture<ModaldeletefactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeletefactureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeletefactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
