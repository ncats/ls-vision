import { TestBed } from '@angular/core/testing';

import { MappingEngineService } from './mapping-engine.service';

describe('MappingEngineService', () => {
  let service: MappingEngineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MappingEngineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
