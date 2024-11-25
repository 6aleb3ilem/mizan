import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatetypeComponent } from './modalupdatetype.component';

describe('ModalupdatetypeComponent', () => {
  let component: ModalupdatetypeComponent;
  let fixture: ComponentFixture<ModalupdatetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
