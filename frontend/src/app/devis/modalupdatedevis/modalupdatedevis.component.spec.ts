import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatedevisComponent } from './modalupdatedevis.component';

describe('ModalupdatedevisComponent', () => {
  let component: ModalupdatedevisComponent;
  let fixture: ComponentFixture<ModalupdatedevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalupdatedevisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalupdatedevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
