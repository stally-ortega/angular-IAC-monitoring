import { TestBed } from '@angular/core/testing';

import { TradingData } from './trading-data';

describe('TradingData', () => {
  let service: TradingData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradingData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
