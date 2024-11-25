import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateitemTacheComponent } from './modalupdateitem-tache.component';

describe('ModalupdateitemTacheComponent', () => {
  let component: ModalupdateitemTacheComponent;
  let fixture: ComponentFixture<ModalupdateitemTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdateitemTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdateitemTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
