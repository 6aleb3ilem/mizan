import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldeletesituationComponent } from './modaldeletesituation.component';

describe('ModaldeletesituationComponent', () => {
  let component: ModaldeletesituationComponent;
  let fixture: ComponentFixture<ModaldeletesituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModaldeletesituationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModaldeletesituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
