import { TestBed } from '@angular/core/testing';

import { PlayerDecoratorFactoryService } from './player-decorator-factory.service';

describe('PlayerDecoratorFactoryService', () => {
  let service: PlayerDecoratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerDecoratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
