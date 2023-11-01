import { TestBed } from '@angular/core/testing';

import { PharmacistService } from './pharmacist.service';

describe('PharmacistService', () => {
  let service: PharmacistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
