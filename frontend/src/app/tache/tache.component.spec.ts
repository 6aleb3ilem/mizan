import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TacheComponent } from './tache.component';

describe('tacheComponent', () => {
  let component: TacheComponent;
  let fixture: ComponentFixture<TacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
