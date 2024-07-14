import { TestBed } from '@angular/core/testing';

import { ModelRestClientService } from './model-rest-client.service';

describe('ModelRestClientService', () => {
  let service: ModelRestClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelRestClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
