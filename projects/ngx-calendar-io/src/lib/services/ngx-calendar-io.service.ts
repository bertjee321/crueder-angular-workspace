import { Injectable } from '@angular/core';
import { CalendarEvents, CalendarGrid, CalendarGridCell } from '../models';

import {
  addMonth,
  compareDatesAreSameDay,
  getExactDate,
  getFirstWeekDayNumber,
  getFirstWeekDayString,
  getNumberOfDaysInMonth,
  subtractMonth,
} from '../utils/date.utils';

@Injectable({
  providedIn: 'root',
})
export class NgxCalendarIoService {
  readonly DEFAULT_DATE = new Date(1970, 0, 1);
  readonly DAYS_OF_WEEK = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  public grid: CalendarGrid[] = [];

  constructor() {}

  /**
   * Initializes the calendar grid with specified date, events, locale, and grid length.
   * @param date The base date for the calendar.
   * @param events Calendar events for populating the grid.
   * @param locale The locale for date formatting.
   * @param length The length of the calendar grid (number of rows).
   */
  public initializeGrid(
    date: Date,
    events: CalendarEvents,
    locale: string,
    length: number = 6
  ) {
    this.grid = this.createGrid(length);
    this.setGridDatesAndEvents(date, events, locale);
  }

  /**
   * Creates a default calendar grid with specified length.
   * @param length The length of the calendar grid (number of rows).
   * @returns The generated calendar grid.
   */
  private createGrid(
    length: number = 6 /* temporary default set to six, so there are always enough grid rows, should become more dynamic later*/
  ): CalendarGrid[] {
    return Array.from({ length }, () => {
      const week: CalendarGrid = {};
      this.DAYS_OF_WEEK.forEach((day) => {
        week[day] = {
          date: this.DEFAULT_DATE,
          tasks: [],
          appointments: [],
        };
      });
      return week;
    });
  }

  /**
   * Sets the dates and events in the calendar grid based on the specified date and events.
   * @param date - The base date for the calendar.
   * @param events - The calendar events.
   * @param locale - The locale for formatting.
   */
  private setGridDatesAndEvents(
    date: Date,
    events: CalendarEvents,
    locale: string
  ) {
    const firstWeekDay = getFirstWeekDayString(date, locale);
    const numberOfDaysMonth = getNumberOfDaysInMonth(date);
    const numberOfDaysPreviousMonth = getNumberOfDaysInMonth(
      subtractMonth(date)
    );

    let firstDayIsSet = false;
    let currentDayToSet = 1;
    let currentDayToSetNextMonth = 1;
    let numberOfDaysPrevMonthToFill = getFirstWeekDayNumber(date);

    for (const currentWeek of this.grid) {
      for (const [day, cell] of Object.entries(currentWeek)) {
        if (numberOfDaysPrevMonthToFill > 0) {
          this.populateCellForPreviousMonth(
            cell,
            date,
            events,
            numberOfDaysPreviousMonth,
            numberOfDaysPrevMonthToFill
          );
          numberOfDaysPrevMonthToFill--;
        } else if (currentDayToSet > numberOfDaysMonth) {
          this.populateCellForNextMonth(
            cell,
            date,
            events,
            currentDayToSetNextMonth
          );
          currentDayToSetNextMonth++;
        } else if (firstDayIsSet || day === firstWeekDay.toLowerCase()) {
          this.populateCellForCurrentMonth(cell, date, events, currentDayToSet);
          currentDayToSet++;
          firstDayIsSet = true;
        }
      }
    }
  }

  /**
   * Sets the date and events for a calendar cell.
   * @param cell - The calendar cell to update.
   * @param date - The base date for the cell.
   * @param events - The calendar events.
   */
  private setCellDateAndEvents(
    cell: CalendarGridCell,
    date: Date,
    events: CalendarEvents
  ) {
    cell.date = date;
    cell.tasks = events.tasks.filter((task) =>
      compareDatesAreSameDay(cell.date, task.date)
    );
    cell.appointments = events.appointments.filter((appointment) =>
      compareDatesAreSameDay(cell.date, appointment.date)
    );
  }

  /**
   * Sets the date and events for the previous month in the given cell.
   * @param cell - The cell to populate.
   * @param date - The base date for calculations.
   * @param events - The calendar events.
   * @param numberOfDaysPreviousMonth - The total number of days from the previous month.
   * @param numberOfDaysPrevMonthToFill - The number of days from the previous month to fill.
   */
  private populateCellForPreviousMonth(
    cell: CalendarGridCell,
    date: Date,
    events: CalendarEvents,
    numberOfDaysPreviousMonth: number,
    numberOfDaysPrevMonthToFill: number
  ) {
    const dayToSet =
      numberOfDaysPreviousMonth - (numberOfDaysPrevMonthToFill - 1);
    const exactDate = getExactDate(dayToSet, subtractMonth(date));
    this.setCellDateAndEvents(cell, exactDate, events);
  }

  /**
   * Sets the date and events for the current month in the given cell.
   * @param cell - The cell to populate.
   * @param date - The base date for calculations.
   * @param events - The calendar events.
   * @param dayToSet - The week day number to set.
   */
  private populateCellForCurrentMonth(
    cell: CalendarGridCell,
    date: Date,
    events: CalendarEvents,
    dayToSet: number
  ) {
    const exactDate = getExactDate(dayToSet, date);
    this.setCellDateAndEvents(cell, exactDate, events);
  }

  /**
   * Sets the date and events for the next month in the given cell.
   * @param cell - The cell to populate.
   * @param date - The base date for calculations.
   * @param events - The calendar events.
   * @param dayToSet - The week day number to set.
   * */
  private populateCellForNextMonth(
    cell: CalendarGridCell,
    date: Date,
    events: CalendarEvents,
    dayToSet: number
  ) {
    const exactDate = getExactDate(dayToSet, addMonth(date));
    this.setCellDateAndEvents(cell, exactDate, events);
  }
}
