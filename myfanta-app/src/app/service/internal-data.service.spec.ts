import { TestBed } from '@angular/core/testing';

import { InternalDataService } from './internal-data.service';

describe('InternalDataService', () => {
  let service: InternalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
