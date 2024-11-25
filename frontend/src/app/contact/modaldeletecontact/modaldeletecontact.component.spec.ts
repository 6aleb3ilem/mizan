import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletecontactComponent } from './modaldeletecontact.component';

describe('ModaldeletecontactComponent', () => {
  let component: ModaldeletecontactComponent;
  let fixture: ComponentFixture<ModaldeletecontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletecontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
