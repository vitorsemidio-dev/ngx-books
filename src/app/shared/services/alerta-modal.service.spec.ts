import { TestBed } from '@angular/core/testing';

import { AlertaModalService } from './alerta-modal.service';

describe('AlertaModalService', () => {
  let service: AlertaModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
