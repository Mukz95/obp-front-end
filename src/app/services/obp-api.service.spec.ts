import { TestBed } from '@angular/core/testing';

import { ObpApiService } from './obp-api.service';

describe('ObpApiService', () => {
  let service: ObpApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObpApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
