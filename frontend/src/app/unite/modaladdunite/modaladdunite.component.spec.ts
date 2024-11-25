import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladduniteComponent } from './modaladdunite.component';

describe('ModaladduniteComponent', () => {
  let component: ModaladduniteComponent;
  let fixture: ComponentFixture<ModaladduniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladduniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladduniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
