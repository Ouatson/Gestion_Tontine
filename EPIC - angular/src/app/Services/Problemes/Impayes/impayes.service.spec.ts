import { TestBed } from '@angular/core/testing';

import { ImpayesService } from './impayes.service';

describe('ImpayesService', () => {
  let service: ImpayesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImpayesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
