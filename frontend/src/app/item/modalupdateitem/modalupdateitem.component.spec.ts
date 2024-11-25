import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateitemComponent } from './modalupdateitem.component';

describe('ModalupdateitemComponent', () => {
  let component: ModalupdateitemComponent;
  let fixture: ComponentFixture<ModalupdateitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
