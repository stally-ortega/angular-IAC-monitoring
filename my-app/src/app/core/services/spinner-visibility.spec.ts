import { TestBed } from '@angular/core/testing';

import { SpinnerVisibility } from './spinner-visibility';

describe('SpinnerVisibility', () => {
  let service: SpinnerVisibility;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerVisibility);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
