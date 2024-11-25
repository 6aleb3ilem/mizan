import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatedevistacheComponent } from './modalupdatedevistache.component';

describe('ModalupdatedevistacheComponent', () => {
  let component: ModalupdatedevistacheComponent;
  let fixture: ComponentFixture<ModalupdatedevistacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatedevistacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatedevistacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
