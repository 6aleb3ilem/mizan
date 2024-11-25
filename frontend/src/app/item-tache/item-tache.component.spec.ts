import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTacheComponent } from './item-tache.component';

describe('ItemTacheComponent', () => {
  let component: ItemTacheComponent;
  let fixture: ComponentFixture<ItemTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemTacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
