import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteComponent } from './modaldelete.component';

describe('ModaldeleteComponent', () => {
  let component: ModaldeleteComponent;
  let fixture: ComponentFixture<ModaldeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
