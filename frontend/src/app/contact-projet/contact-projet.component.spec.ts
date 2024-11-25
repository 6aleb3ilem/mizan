import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactProjetComponent } from './contact-projet.component';

describe('ContactProjetComponent', () => {
  let component: ContactProjetComponent;
  let fixture: ComponentFixture<ContactProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
