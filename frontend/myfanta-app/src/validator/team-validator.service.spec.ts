import { TestBed } from '@angular/core/testing';

import { TeamValidatorService } from './team-validator.service';

describe('TeamValidatorService', () => {
  let service: TeamValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
