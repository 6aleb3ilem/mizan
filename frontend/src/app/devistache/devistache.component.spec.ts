import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevistacheComponent } from './devistache.component';

describe('DevistacheComponent', () => {
  let component: DevistacheComponent;
  let fixture: ComponentFixture<DevistacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevistacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevistacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
