import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BctComponent } from './tacheref.component';

describe('BctComponent', () => {
  let component: BctComponent;
  let fixture: ComponentFixture<BctComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BctComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
