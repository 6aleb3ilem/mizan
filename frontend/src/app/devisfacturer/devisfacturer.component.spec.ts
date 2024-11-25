import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevisfacturerComponent } from './devisfacturer.component';

describe('DevisfacturerComponent', () => {
  let component: DevisfacturerComponent;
  let fixture: ComponentFixture<DevisfacturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DevisfacturerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DevisfacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
