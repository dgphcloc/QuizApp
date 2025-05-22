import { TestBed } from '@angular/core/testing';

import { ResultStoreService } from './result-store.service';

describe('ResultStoreService', () => {
  let service: ResultStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
