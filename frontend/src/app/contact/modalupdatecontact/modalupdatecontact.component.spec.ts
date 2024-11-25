import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatecontactComponent } from './modalupdatecontact.component';

describe('ModalupdatecontactComponent', () => {
  let component: ModalupdatecontactComponent;
  let fixture: ComponentFixture<ModalupdatecontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatecontactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatecontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
