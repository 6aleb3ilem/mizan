import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteitemTacheComponent } from './modaldeleteitem-tache.component';

describe('ModaldeleteitemTacheComponent', () => {
  let component: ModaldeleteitemTacheComponent;
  let fixture: ComponentFixture<ModaldeleteitemTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteitemTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteitemTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
