import { TestBed } from '@angular/core/testing';

import { LsVisionService } from './ls-vision.service';

describe('LsVisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LsVisionService = TestBed.get(LsVisionService);
    expect(service).toBeTruthy();
  });
});
