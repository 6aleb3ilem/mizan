import { TestBed } from '@angular/core/testing';

import { ContactProjetService } from './contact-projet.service';

describe('ContactProjetService', () => {
  let service: ContactProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
