import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateuniteComponent } from './modalupdateunite.component';

describe('ModalupdateuniteComponent', () => {
  let component: ModalupdateuniteComponent;
  let fixture: ComponentFixture<ModalupdateuniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateuniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateuniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
