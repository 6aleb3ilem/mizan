import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletetacheComponent } from './modaldeletetache.component';

describe('ModaldeletetacheComponent', () => {
  let component: ModaldeletetacheComponent;
  let fixture: ComponentFixture<ModaldeletetacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeletetacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeletetacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
