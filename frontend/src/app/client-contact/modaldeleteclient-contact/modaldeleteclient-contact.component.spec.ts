import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteclientContactComponent } from './modaldeleteclient-contact.component';

describe('ModaldeleteclientContactComponent', () => {
  let component: ModaldeleteclientContactComponent;
  let fixture: ComponentFixture<ModaldeleteclientContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaldeleteclientContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaldeleteclientContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
