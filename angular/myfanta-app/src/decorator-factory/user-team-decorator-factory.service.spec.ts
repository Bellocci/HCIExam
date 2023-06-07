import { TestBed } from '@angular/core/testing';

import { UserTeamDecoratorFactoryService } from './user-team-decorator-factory.service';

describe('UserTeamDecoratorFactoryService', () => {
  let service: UserTeamDecoratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTeamDecoratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
