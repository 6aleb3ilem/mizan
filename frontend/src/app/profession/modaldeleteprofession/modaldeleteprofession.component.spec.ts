import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeleteprofessionComponent } from './modaldeleteprofession.component';

describe('ModaldeleteprofessionComponent', () => {
  let component: ModaldeleteprofessionComponent;
  let fixture: ComponentFixture<ModaldeleteprofessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeleteprofessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeleteprofessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
