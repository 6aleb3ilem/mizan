import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletetypeComponent } from './modaldeletetype.component';

describe('ModaldeletetypeComponent', () => {
  let component: ModaldeletetypeComponent;
  let fixture: ComponentFixture<ModaldeletetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
