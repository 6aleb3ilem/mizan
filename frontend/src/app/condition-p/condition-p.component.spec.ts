import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionPComponent } from './condition-p.component';

describe('ConditionPComponent', () => {
  let component: ConditionPComponent;
  let fixture: ComponentFixture<ConditionPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionPComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditionPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
