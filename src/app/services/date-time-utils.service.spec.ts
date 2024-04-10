import { TestBed } from '@angular/core/testing';

import { DateTimeUtilsService } from './date-time-utils.service';

describe('DateTimeUtilsService', () => {
  let service: DateTimeUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateTimeUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
