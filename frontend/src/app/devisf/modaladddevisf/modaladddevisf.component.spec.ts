import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladddevisfComponent } from './modaladddevisf.component';

describe('ModaladddevisfComponent', () => {
  let component: ModaladddevisfComponent;
  let fixture: ComponentFixture<ModaladddevisfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladddevisfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladddevisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
