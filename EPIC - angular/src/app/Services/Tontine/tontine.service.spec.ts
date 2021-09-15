import { TestBed } from '@angular/core/testing';

import { TontineService } from './tontine.service';

describe('TontineService', () => {
  let service: TontineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TontineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
