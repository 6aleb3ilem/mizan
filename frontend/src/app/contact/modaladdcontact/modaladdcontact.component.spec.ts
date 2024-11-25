import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdcontactComponent } from './modaladdcontact.component';

describe('ModaladdcontactComponent', () => {
  let component: ModaladdcontactComponent;
  let fixture: ComponentFixture<ModaladdcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdcontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
