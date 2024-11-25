import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletedevisfComponent } from './modaldeletedevisf.component';

describe('ModaldeletedevisfComponent', () => {
  let component: ModaldeletedevisfComponent;
  let fixture: ComponentFixture<ModaldeletedevisfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletedevisfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletedevisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
