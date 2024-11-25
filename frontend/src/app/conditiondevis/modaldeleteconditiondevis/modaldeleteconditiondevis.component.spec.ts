import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteconditiondevisComponent } from './modaldeleteconditiondevis.component';

describe('ModaldeleteconditiondevisComponent', () => {
  let component: ModaldeleteconditiondevisComponent;
  let fixture: ComponentFixture<ModaldeleteconditiondevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeleteconditiondevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeleteconditiondevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
