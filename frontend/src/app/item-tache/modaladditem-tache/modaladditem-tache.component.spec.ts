import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladditemTacheComponent } from './modaladditem-tache.component';

describe('ModaladditemTacheComponent', () => {
  let component: ModaladditemTacheComponent;
  let fixture: ComponentFixture<ModaladditemTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladditemTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladditemTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
