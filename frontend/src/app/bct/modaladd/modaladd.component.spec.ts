import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdComponent } from './modaladd.component';

describe('ModaladdComponent', () => {
  let component: ModaladdComponent;
  let fixture: ComponentFixture<ModaladdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaladdComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
