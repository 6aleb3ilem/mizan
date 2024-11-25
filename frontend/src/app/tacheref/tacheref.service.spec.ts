import { TestBed } from '@angular/core/testing';

import { BctService } from './tacheref.service';

describe('BctService', () => {
  let service: BctService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BctService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
