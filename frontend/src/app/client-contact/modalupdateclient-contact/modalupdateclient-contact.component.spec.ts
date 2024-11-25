import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateclientContactComponent } from './modalupdateclient-contact.component';

describe('ModalupdateclientContactComponent', () => {
  let component: ModalupdateclientContactComponent;
  let fixture: ComponentFixture<ModalupdateclientContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateclientContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateclientContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
