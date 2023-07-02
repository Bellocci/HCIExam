import { TestBed } from '@angular/core/testing';

import { LeagueDecoratorFactoryService } from './league-decorator-factory.service';

describe('LeagueDecoratorFactoryService', () => {
  let service: LeagueDecoratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeagueDecoratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
