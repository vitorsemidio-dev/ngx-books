import { TestBed } from '@angular/core/testing';

import { UsuarioAuthGuard } from './usuario-auth.guard';

describe('UsuarioAuthGuard', () => {
  let guard: UsuarioAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UsuarioAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
