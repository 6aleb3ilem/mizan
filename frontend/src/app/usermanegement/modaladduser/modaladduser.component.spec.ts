import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladduserComponent } from './modaladduser.component';

describe('ModaladduserComponent', () => {
  let component: ModaladduserComponent;
  let fixture: ComponentFixture<ModaladduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladduserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
