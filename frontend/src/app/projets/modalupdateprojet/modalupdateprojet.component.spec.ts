import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateprojetComponent } from './modalupdateprojet.component';

describe('ModalupdateprojetComponent', () => {
  let component: ModalupdateprojetComponent;
  let fixture: ComponentFixture<ModalupdateprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
