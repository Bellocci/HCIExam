import { TestBed } from '@angular/core/testing';

import { InternalDimensionService } from './internal-dimension.service';

describe('InternalDimensionService', () => {
  let service: InternalDimensionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternalDimensionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
