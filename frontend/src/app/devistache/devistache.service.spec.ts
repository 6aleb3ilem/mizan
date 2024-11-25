import { TestBed } from '@angular/core/testing';

import { DevistacheService } from './devistache.service';

describe('DevistacheService', () => {
  let service: DevistacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevistacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
