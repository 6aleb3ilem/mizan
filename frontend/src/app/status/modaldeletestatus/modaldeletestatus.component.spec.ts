import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletestatusComponent } from './modaldeletestatus.component';

describe('ModaldeletestatusComponent', () => {
  let component: ModaldeletestatusComponent;
  let fixture: ComponentFixture<ModaldeletestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeletestatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeletestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
