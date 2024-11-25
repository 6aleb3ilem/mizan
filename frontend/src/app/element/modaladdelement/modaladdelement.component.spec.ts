import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdelementComponent } from './modaladdelement.component';

describe('ModaladdelementComponent', () => {
  let component: ModaladdelementComponent;
  let fixture: ComponentFixture<ModaladdelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdelementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
