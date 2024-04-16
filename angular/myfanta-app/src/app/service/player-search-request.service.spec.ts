import { TestBed } from '@angular/core/testing';

import { PlayerSearchRequestService } from './player-search-request.service';

describe('PlayerSearchRequestService', () => {
  let service: PlayerSearchRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerSearchRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
