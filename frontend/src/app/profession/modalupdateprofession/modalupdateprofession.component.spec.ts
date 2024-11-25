import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateprofessionComponent } from './modalupdateprofession.component';

describe('ModalupdateprofessionComponent', () => {
  let component: ModalupdateprofessionComponent;
  let fixture: ComponentFixture<ModalupdateprofessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdateprofessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdateprofessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
