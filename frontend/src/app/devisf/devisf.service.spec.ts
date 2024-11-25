import { TestBed } from '@angular/core/testing';

import { DevisfService } from './devisf.service';

describe('DevisfService', () => {
  let service: DevisfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevisfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
