import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteitemComponent } from './modaldeleteitem.component';

describe('ModaldeleteitemComponent', () => {
  let component: ModaldeleteitemComponent;
  let fixture: ComponentFixture<ModaldeleteitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
