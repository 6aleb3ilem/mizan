import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatedevisfComponent } from './modalupdatedevisf.component';

describe('ModalupdatedevisfComponent', () => {
  let component: ModalupdatedevisfComponent;
  let fixture: ComponentFixture<ModalupdatedevisfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatedevisfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatedevisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
