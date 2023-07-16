import { TestBed } from '@angular/core/testing';

import { PlayerValidatorService } from './player-validator.service';

describe('PlayerValidatorService', () => {
  let service: PlayerValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
