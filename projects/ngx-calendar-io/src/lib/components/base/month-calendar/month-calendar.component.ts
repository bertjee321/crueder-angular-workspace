import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { testData } from '../../../models/test-data';
import { CapitalizeFirstPipe } from '../../../pipes/capitalize-first.pipe';
import { NgxCalendarIoService } from '../../../services/ngx-calendar-io.service';
import { getMonthString } from '../../../utils';
import { WeekdayComponent } from '../../shared/weekday/weekday.component';
import { CalendarEvents, CalendarGrid } from '../../../models';

@Component({
  selector: 'month-calendar',
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe, WeekdayComponent],
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css'],
})
export class MonthCalendarComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() events: CalendarEvents = testData;
  protected grid: CalendarGrid[] = [];
  private readonly locale: string = 'en';

  protected get monthName(): string {
    return getMonthString(this.date, this.locale);
  }

  protected get daysOfWeek(): string[] {
    return this.calendarService.DAYS_OF_WEEK;
  }

  constructor(private calendarService: NgxCalendarIoService) {}

  ngOnInit(): void {
    this.calendarService.initializeGrid(this.date, this.events, this.locale);
    this.grid = this.calendarService.grid;
  }
}
