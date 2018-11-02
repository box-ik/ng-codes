import { TestBed } from '@angular/core/testing';

import { BoxIkCheatCodesService } from './cheat-codes.service';

describe('BoxIkCheatCodesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BoxIkCheatCodesService = TestBed.get(BoxIkCheatCodesService);
    expect(service).toBeTruthy();
  });
});
