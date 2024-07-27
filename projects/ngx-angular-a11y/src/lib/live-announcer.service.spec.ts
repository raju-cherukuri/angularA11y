import { TestBed } from '@angular/core/testing';

import { LiveAnnouncerService } from './live-announcer.service';

describe('NgxAngularA11yService', () => {
  let service: LiveAnnouncerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiveAnnouncerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
