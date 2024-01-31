import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pharmacyGuard } from './pharmacy.guard';

describe('pharmacyGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pharmacyGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
