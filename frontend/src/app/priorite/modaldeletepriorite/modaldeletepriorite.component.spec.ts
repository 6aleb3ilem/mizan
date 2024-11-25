import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteprioriteComponent } from './modaldeletepriorite.component';

describe('ModaldeleteprioriteComponent', () => {
  let component: ModaldeleteprioriteComponent;
  let fixture: ComponentFixture<ModaldeleteprioriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeleteprioriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeleteprioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
