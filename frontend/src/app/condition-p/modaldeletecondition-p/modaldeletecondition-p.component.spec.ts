import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteconditionPComponent } from './modaldeletecondition-p.component';

describe('ModaldeleteconditionPComponent', () => {
  let component: ModaldeleteconditionPComponent;
  let fixture: ComponentFixture<ModaldeleteconditionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeleteconditionPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeleteconditionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
