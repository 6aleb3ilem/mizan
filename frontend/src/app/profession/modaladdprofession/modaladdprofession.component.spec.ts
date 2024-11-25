import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdprofessionComponent } from './modaladdprofession.component';

describe('ModaladdprofessionComponent', () => {
  let component: ModaladdprofessionComponent;
  let fixture: ComponentFixture<ModaladdprofessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdprofessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdprofessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
