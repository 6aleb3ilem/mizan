import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdtypeComponent } from './modaladdtype.component';

describe('ModaladdtypeComponent', () => {
  let component: ModaladdtypeComponent;
  let fixture: ComponentFixture<ModaladdtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdtypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
