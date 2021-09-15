import { TestBed } from '@angular/core/testing';

import { VersementService } from './versement.service';

describe('VersementService', () => {
  let service: VersementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VersementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
