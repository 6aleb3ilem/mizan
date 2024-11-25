import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladddevistacheComponent } from './modaladddevistache.component';

describe('ModaladddevistacheComponent', () => {
  let component: ModaladddevistacheComponent;
  let fixture: ComponentFixture<ModaladddevistacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladddevistacheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladddevistacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
