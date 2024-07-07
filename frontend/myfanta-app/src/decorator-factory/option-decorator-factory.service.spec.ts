import { TestBed } from '@angular/core/testing';

import { OptionDecoratorFactoryService } from './option-decorator-factory.service';

describe('OptionDecoratorFactoryService', () => {
  let service: OptionDecoratorFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionDecoratorFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
