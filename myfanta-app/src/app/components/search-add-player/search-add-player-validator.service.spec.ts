import { TestBed } from '@angular/core/testing';

import { SearchAddPlayerValidatorService } from './search-add-player-validator.service';

describe('SearchAddPlayerValidatorService', () => {
  let service: SearchAddPlayerValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchAddPlayerValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
