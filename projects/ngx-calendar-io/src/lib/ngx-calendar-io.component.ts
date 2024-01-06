
import { Component, Input, OnInit } from '@angular/core';
import { MonthCalendarGrid } from './models/month-calendar-grid.model';

@Component({
  selector: 'ngx-calendar-io',
  standalone: true, // TO DO: figure out what this means :)
  imports: [],
  templateUrl: './ngx-calendar-io.component.html',
  styleUrls: ['./ngx-calendar-io.component.css'],
})
export class NgxCalendarIoComponent implements OnInit {
  @Input() date!: Date;
  @Input() locale: string = 'en';
  private month?: string;
  private firstWeekDay?: string;

  private DAYS_OF_WEEK = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  protected grid: MonthCalendarGrid[] = Array.from({ length: 5 }, () => ({
    monday: {
      date: undefined,
      events: [],
    },
    tuesday: {
      date: undefined,
      events: [],
    },
    wednesday: {
      date: undefined,
      events: [],
    },
    thursday: {
      date: undefined,
      events: [],
    },
    friday: {
      date: undefined,
      events: [],
    },
    saturday: {
      date: undefined,
      events: [],
    },
    sunday: {
      date: undefined,
      events: [],
    },
  }));

  ngOnInit(): void {
    this.month = this.getMonthString(this.date);
    this.firstWeekDay = this.getFirstWeekDayString(this.date);
  }

  // utils
  private getMonthString(date: Date): string {
    return date.toLocaleString(this.locale, { month: 'long' });
  }

  // utils
  private getFirstWeekDayString(date: Date): string {
    const monthName = this.getMonthString(date);
    const year = date.getFullYear().toString();

    return new Date(`${monthName} 1, ${year}`).toLocaleString(this.locale, {
      weekday: 'long',
    });
  }

  // utils
  private getNumberOfDaysInMonth(date: Date): number {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;

    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    return daysInMonth;
  }

  // component function (stays here)
  private setGridDates() {
    const month = this.getMonthString(this.date);
    const firstWeekDay = this.getFirstWeekDayString(this.date);
    const numberOfDaysMonth = this.getNumberOfDaysInMonth(this.date);

    let firstDayIsSet = false;
    let currentDayToSet = 1;
    let currentDateToSet = new Date(`${month}-${currentDayToSet}`);

    for (let week in this.grid) {
      Object.entries(this.grid[+week]).forEach(([key]) => {
        if (currentDayToSet > numberOfDaysMonth) {
          return;
        }

        if (firstDayIsSet) {
          this.grid[+week][key].date = currentDateToSet;
          currentDayToSet += 1;
          currentDateToSet = new Date(`${month}-${currentDayToSet}`);
        } else {
          if (key === firstWeekDay.toLowerCase()) {
            this.grid[+week][key].date = currentDateToSet;
            currentDayToSet += 1;
            currentDateToSet = new Date(`${month}-${currentDayToSet}`);
            firstDayIsSet = true;
          }
        }
      });
    }
  }
}
