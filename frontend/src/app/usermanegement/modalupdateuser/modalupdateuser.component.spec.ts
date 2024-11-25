import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateuserComponent } from './modalupdateuser.component';

describe('ModalupdateuserComponent', () => {
  let component: ModalupdateuserComponent;
  let fixture: ComponentFixture<ModalupdateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdateuserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
