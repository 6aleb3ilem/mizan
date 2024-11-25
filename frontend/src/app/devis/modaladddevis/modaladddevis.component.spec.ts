import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladddevisComponent } from './modaladddevis.component';

describe('ModaladddevisComponent', () => {
  let component: ModaladddevisComponent;
  let fixture: ComponentFixture<ModaladddevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladddevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladddevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
