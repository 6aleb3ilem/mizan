import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateelementComponent } from './modalupdateelement.component';

describe('ModalupdateelementComponent', () => {
  let component: ModalupdateelementComponent;
  let fixture: ComponentFixture<ModalupdateelementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateelementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateelementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
