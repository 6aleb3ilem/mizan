import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditiondevisComponent } from './conditiondevis.component';

describe('ConditiondevisComponent', () => {
  let component: ConditiondevisComponent;
  let fixture: ComponentFixture<ConditiondevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditiondevisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConditiondevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
