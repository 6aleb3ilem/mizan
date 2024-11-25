import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletedevistacheComponent } from './modaldeletedevistache.component';

describe('ModaldeletedevistacheComponent', () => {
  let component: ModaldeletedevistacheComponent;
  let fixture: ComponentFixture<ModaldeletedevistacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletedevistacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletedevistacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
