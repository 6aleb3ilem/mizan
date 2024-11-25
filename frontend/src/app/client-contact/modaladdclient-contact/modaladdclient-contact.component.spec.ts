import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdclientContactComponent } from './modaladdclient-contact.component';

describe('ModaladdclientContactComponent', () => {
  let component: ModaladdclientContactComponent;
  let fixture: ComponentFixture<ModaladdclientContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdclientContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdclientContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
