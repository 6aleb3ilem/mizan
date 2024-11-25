import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisfComponent } from './devisf.component';

describe('DevisfComponent', () => {
  let component: DevisfComponent;
  let fixture: ComponentFixture<DevisfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevisfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
