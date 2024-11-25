import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteuniteComponent } from './modaldeleteunite.component';

describe('ModaldeleteuniteComponent', () => {
  let component: ModaldeleteuniteComponent;
  let fixture: ComponentFixture<ModaldeleteuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteuniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
