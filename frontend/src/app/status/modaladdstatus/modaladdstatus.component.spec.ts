import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdstatusComponent } from './modaladdstatus.component';

describe('ModaladdstatusComponent', () => {
  let component: ModaladdstatusComponent;
  let fixture: ComponentFixture<ModaladdstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdstatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
