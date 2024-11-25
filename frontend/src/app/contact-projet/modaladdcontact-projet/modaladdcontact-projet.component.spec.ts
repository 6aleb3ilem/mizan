import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaladdcontactProjetComponent } from './modaladdcontact-projet.component';

describe('ModaladdcontactProjetComponent', () => {
  let component: ModaladdcontactProjetComponent;
  let fixture: ComponentFixture<ModaladdcontactProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModaladdcontactProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModaladdcontactProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
