import { TestBed } from '@angular/core/testing';

import { SearchPlayersService } from './search-players.service';

describe('SearchPlayersService', () => {
  let service: SearchPlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchPlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
