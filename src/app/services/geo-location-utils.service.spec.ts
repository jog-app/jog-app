import { TestBed } from '@angular/core/testing';

import { GeoLocationUtilsService } from './geo-location-utils.service';

describe('GeoLocationUtilsService', () => {
  let service: GeoLocationUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoLocationUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
