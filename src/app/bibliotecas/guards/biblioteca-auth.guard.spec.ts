import { TestBed } from '@angular/core/testing';

import { BibliotecaAuthGuard } from './biblioteca-auth.guard';

describe('BibliotecaAuthGuard', () => {
  let guard: BibliotecaAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(BibliotecaAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
