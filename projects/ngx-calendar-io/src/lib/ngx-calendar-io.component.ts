import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MonthCalendarGrid } from './models/month-calendar-grid.model';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import {
  getExactDate,
  getFirstWeekDayString,
  getMonthString,
  getNumberOfDaysInMonth,
} from './utils/date.utils';

@Component({
  selector: 'ngx-calendar-io',
  standalone: true, // TO DO: figure out what this means :)
  imports: [CommonModule, CapitalizeFirstPipe],
  templateUrl: './ngx-calendar-io.component.html',
  styleUrls: ['./ngx-calendar-io.component.css'],
})
export class NgxCalendarIoComponent implements OnInit {
  @Input() date: Date = new Date(2024, 1);
  @Input() locale: string = 'en';

  protected get monthName(): string {
    return getMonthString(this.date, this.locale);
  }

  protected readonly DAYS_OF_WEEK = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  protected grid: MonthCalendarGrid[] = Array.from({ length: 5 }, () => {
    const week: MonthCalendarGrid = {};
    this.DAYS_OF_WEEK.forEach((day) => {
      week[day] = {
        date: undefined,
        events: [],
      };
    });
    return week;
  });

  ngOnInit(): void {
    this.setGridDates();
  }

  private setGridDates() {
    const firstWeekDay = getFirstWeekDayString(this.date, this.locale);
    const numberOfDaysMonth = getNumberOfDaysInMonth(this.date);

    let firstDayIsSet = false;
    let currentDayToSet = 1;

    for (let weekIndex = 0; weekIndex < this.grid.length; weekIndex++) {
      const currentWeek = this.grid[weekIndex];

      for (const [day, cell] of Object.entries(currentWeek)) {
        if (currentDayToSet > numberOfDaysMonth) {
          break;
        }

        const currentDateToSet = getExactDate(currentDayToSet, this.date);

        if (firstDayIsSet || day === firstWeekDay.toLowerCase()) {
          cell.date = currentDateToSet;
          currentDayToSet++;
          firstDayIsSet = true;
        }
      }
    }
  }
}
