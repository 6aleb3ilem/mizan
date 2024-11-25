import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdprioriteComponent } from './modaladdpriorite.component';

describe('ModaladdprioriteComponent', () => {
  let component: ModaladdprioriteComponent;
  let fixture: ComponentFixture<ModaladdprioriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdprioriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdprioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
