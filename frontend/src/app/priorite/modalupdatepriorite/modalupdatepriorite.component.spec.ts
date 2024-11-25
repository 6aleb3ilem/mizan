import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdateprioriteComponent } from './modalupdatepriorite.component';

describe('ModalupdateprioriteComponent', () => {
  let component: ModalupdateprioriteComponent;
  let fixture: ComponentFixture<ModalupdateprioriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdateprioriteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdateprioriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
