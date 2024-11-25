import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladditemComponent } from './modaladditem.component';

describe('ModaladditemComponent', () => {
  let component: ModaladditemComponent;
  let fixture: ComponentFixture<ModaladditemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladditemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladditemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
