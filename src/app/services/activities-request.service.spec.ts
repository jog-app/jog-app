import { TestBed } from '@angular/core/testing';

import { ActivitiesRequestService } from './activities-request.service';

describe('ActivitiesRequestService', () => {
  let service: ActivitiesRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
