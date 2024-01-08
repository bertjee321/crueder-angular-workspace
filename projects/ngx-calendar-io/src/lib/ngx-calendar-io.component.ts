import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MonthCalendarGrid } from './models/month-calendar-grid.model';
import { CapitalizeFirstPipe } from './pipes/capitalize-first.pipe';
import {
  addMonth,
  getExactDate,
  getFirstWeekDayString,
  getMonthString,
  getNumberOfDaysInMonth,
  subtractMonth,
} from './utils/date.utils';
import { NgxCalendarIoService } from './ngx-calendar-io.service';

@Component({
  selector: 'ngx-calendar-io',
  standalone: true, // TO DO: figure out what this means :)
  imports: [CommonModule, CapitalizeFirstPipe],
  templateUrl: './ngx-calendar-io.component.html',
  styleUrls: ['./ngx-calendar-io.component.css'],
})
export class NgxCalendarIoComponent implements OnInit {
  @Input() date: Date = new Date(2024, 0);
  @Input() locale: string = 'en';
  protected grid: MonthCalendarGrid[] = [];

  protected get monthName(): string {
    return getMonthString(this.date, this.locale);
  }

  protected get daysOfWeek(): string[] {
    return this.calendarService.DAYS_OF_WEEK;
  }

  constructor(private calendarService: NgxCalendarIoService) {}

  ngOnInit(): void {
    this.grid = this.calendarService.createMonthGrid();
    this.setGridDates();
  }

  private setGridDates() {
    const firstWeekDay = getFirstWeekDayString(this.date, this.locale);
    const numberOfDaysMonth = getNumberOfDaysInMonth(this.date);
    const totalNumberOfDaysPreviousMonth = getNumberOfDaysInMonth(
      subtractMonth(this.date)
    );

    let firstDayIsSet = false;
    let currentDayToSet = 1;
    let currentDayToSetNextMonth = 1;
    let numberOfDaysPrevMonthToFill = this.calculateDaysToFillPreviousMonth();

    for (let weekIndex = 0; weekIndex < this.grid.length; weekIndex++) {
      const currentWeek = this.grid[weekIndex];

      for (const [day, cell] of Object.entries(currentWeek)) {
        if (numberOfDaysPrevMonthToFill > 0) {
          cell.date = getExactDate(
            totalNumberOfDaysPreviousMonth - (numberOfDaysPrevMonthToFill - 1),
            subtractMonth(this.date)
          );
          numberOfDaysPrevMonthToFill--;
        }

        if (currentDayToSet > numberOfDaysMonth) {
          cell.date = getExactDate(
            currentDayToSetNextMonth,
            addMonth(this.date)
          );
          currentDayToSetNextMonth++;
        } else if (firstDayIsSet || day === firstWeekDay.toLowerCase()) {
          cell.date = getExactDate(currentDayToSet, this.date);
          currentDayToSet++;
          firstDayIsSet = true;
        }
      }
    }
  }

  private calculateDaysToFillPreviousMonth(): number {
    return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  }
}
