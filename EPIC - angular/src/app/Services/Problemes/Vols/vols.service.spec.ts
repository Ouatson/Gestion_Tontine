import { TestBed } from '@angular/core/testing';

import { VolsService } from './vols.service';

describe('VolsService', () => {
  let service: VolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
