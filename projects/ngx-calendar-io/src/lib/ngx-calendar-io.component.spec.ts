import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCalendarIoComponent } from './ngx-calendar-io.component';

describe('NgxCalendarIoComponent', () => {
  let component: NgxCalendarIoComponent;
  let fixture: ComponentFixture<NgxCalendarIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxCalendarIoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxCalendarIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
