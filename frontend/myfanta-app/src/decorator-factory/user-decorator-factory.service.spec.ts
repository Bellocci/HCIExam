import { TestBed } from '@angular/core/testing';

import { UserDecoratorFactoryService } from './user-decorator-factory.service';

describe('UserDecoratorFactoryService', () => {
  let service: UserDecoratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDecoratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
