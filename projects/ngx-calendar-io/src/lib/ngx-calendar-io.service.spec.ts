import { TestBed } from '@angular/core/testing';

import { NgxCalendarIoService } from './ngx-calendar-io.service';

describe('NgxCalendarIoService', () => {
  let service: NgxCalendarIoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCalendarIoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
