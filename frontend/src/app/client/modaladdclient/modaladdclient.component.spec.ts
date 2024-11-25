import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdclientComponent } from './modaladdclient.component';

describe('ModaladdclientComponent', () => {
  let component: ModaladdclientComponent;
  let fixture: ComponentFixture<ModaladdclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
