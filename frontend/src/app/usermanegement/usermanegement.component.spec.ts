import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermanegementComponent } from './usermanegement.component';

describe('UsermanegementComponent', () => {
  let component: UsermanegementComponent;
  let fixture: ComponentFixture<UsermanegementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsermanegementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsermanegementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
