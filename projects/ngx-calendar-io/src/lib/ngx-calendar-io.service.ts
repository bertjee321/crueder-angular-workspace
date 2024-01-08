import { Injectable } from '@angular/core';
import {
  getFirstWeekDayString,
  getNumberOfDaysInMonth,
} from './utils/date.utils';
import { MonthCalendarGrid } from './models/month-calendar-grid.model';

@Injectable({
  providedIn: 'root',
})
export class NgxCalendarIoService {
  readonly DAYS_OF_WEEK = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  constructor() {}

  createMonthGrid(): MonthCalendarGrid[] {
    return Array.from({ length: 5 }, () => {
      const week: MonthCalendarGrid = {};
      this.DAYS_OF_WEEK.forEach((day) => {
        week[day] = {
          date: undefined,
          events: [],
        };
      });
      return week;
    });
  }
}
