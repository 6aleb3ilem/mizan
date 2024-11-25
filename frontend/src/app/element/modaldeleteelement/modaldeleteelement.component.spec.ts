import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteelementComponent } from './modaldeleteelement.component';

describe('ModaldeleteelementComponent', () => {
  let component: ModaldeleteelementComponent;
  let fixture: ComponentFixture<ModaldeleteelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteelementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
