import { TestBed } from '@angular/core/testing';

import { UniversalCatcherService } from './universal-catcher.service';

describe('UniversalCatcherService', () => {
  let service: UniversalCatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniversalCatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
