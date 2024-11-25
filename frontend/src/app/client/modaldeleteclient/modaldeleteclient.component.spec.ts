import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteclientComponent } from './modaldeleteclient.component';

describe('ModaldeleteclientComponent', () => {
  let component: ModaldeleteclientComponent;
  let fixture: ComponentFixture<ModaldeleteclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteclientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
