import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalupdatesituationComponent } from './modalupdatesituation.component';

describe('ModalupdatesituationComponent', () => {
  let component: ModalupdatesituationComponent;
  let fixture: ComponentFixture<ModalupdatesituationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalupdatesituationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalupdatesituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
