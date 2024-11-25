import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateclientComponent } from './modalupdateclient.component';

describe('ModalupdateclientComponent', () => {
  let component: ModalupdateclientComponent;
  let fixture: ComponentFixture<ModalupdateclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
