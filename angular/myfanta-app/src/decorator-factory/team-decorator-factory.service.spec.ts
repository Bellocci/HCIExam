import { TestBed } from '@angular/core/testing';

import { TeamDecoratorFactoryService } from './team-decorator-factory.service';

describe('TeamDecoratorFactoryService', () => {
  let service: TeamDecoratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamDecoratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
