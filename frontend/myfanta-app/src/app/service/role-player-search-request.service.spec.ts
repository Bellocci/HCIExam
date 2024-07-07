import { TestBed } from '@angular/core/testing';

import { RolePlayerSearchRequestService } from './role-player-search-request.service';

describe('RolePlayerSearchRequestService', () => {
  let service: RolePlayerSearchRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolePlayerSearchRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
