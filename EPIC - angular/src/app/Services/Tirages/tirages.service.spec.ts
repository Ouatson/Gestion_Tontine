import { TestBed } from '@angular/core/testing';

import { TiragesService } from './tirages.service';

describe('TiragesService', () => {
  let service: TiragesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiragesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
