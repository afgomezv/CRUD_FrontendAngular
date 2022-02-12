import { TestBed } from '@angular/core/testing';

import { ApiserveService } from './apiserve.service';

describe('ApiserveService', () => {
  let service: ApiserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
