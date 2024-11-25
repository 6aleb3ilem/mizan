import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatestatusComponent } from './modalupdatestatus.component';

describe('ModalupdatestatusComponent', () => {
  let component: ModalupdatestatusComponent;
  let fixture: ComponentFixture<ModalupdatestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdatestatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdatestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
