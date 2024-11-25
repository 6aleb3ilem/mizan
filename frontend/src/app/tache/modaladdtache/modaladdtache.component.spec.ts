import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdtacheComponent } from './modaladdtache.component';

describe('modaladdtacheComponent', () => {
  let component: ModaladdtacheComponent;
  let fixture: ComponentFixture<ModaladdtacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdtacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdtacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
