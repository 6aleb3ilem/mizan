import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatetacheComponent } from './modalupdatetache.component';

describe('ModalupdatetacheComponent', () => {
  let component: ModalupdatetacheComponent;
  let fixture: ComponentFixture<ModalupdatetacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatetacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatetacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
