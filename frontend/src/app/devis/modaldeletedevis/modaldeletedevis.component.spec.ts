import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletedevisComponent } from './modaldeletedevis.component';

describe('ModaldeletedevisComponent', () => {
  let component: ModaldeletedevisComponent;
  let fixture: ComponentFixture<ModaldeletedevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletedevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletedevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
