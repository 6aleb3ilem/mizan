import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdprojetComponent } from './modaladdprojet.component';

describe('ModaladdprojetdevisComponent', () => {
  let component: ModaladdprojetComponent;
  let fixture: ComponentFixture<ModaladdprojetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdprojetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdprojetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
