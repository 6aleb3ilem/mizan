import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteprojetComponent } from './modaldeleteprojet.component';

describe('ModaldeleteprojetComponent', () => {
  let component: ModaldeleteprojetComponent;
  let fixture: ComponentFixture<ModaldeleteprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
