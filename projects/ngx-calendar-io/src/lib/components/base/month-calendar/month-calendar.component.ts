import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MonthCalendarGrid } from '../../../models';
import { CapitalizeFirstPipe } from '../../../pipes/capitalize-first.pipe';
import { NgxCalendarIoService } from '../../../services/ngx-calendar-io.service';
import {
  addMonth,
  getExactDate,
  getFirstWeekDayNumber,
  getFirstWeekDayString,
  getMonthString,
  getNumberOfDaysInMonth,
  subtractMonth,
} from '../../../utils';

@Component({
  selector: 'month-calendar',
  standalone: true,
  imports: [CommonModule, CapitalizeFirstPipe],
  templateUrl: './month-calendar.component.html',
  styleUrls: ['./month-calendar.component.css'],
})
export class MonthCalendarComponent implements OnInit {
  @Input() date: Date = new Date();
  @Input() events: Event[] = [];
  
  protected grid: MonthCalendarGrid[] = [];
  private readonly locale: string = 'en';

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
    let numberOfDaysPrevMonthToFill = getFirstWeekDayNumber(this.date);

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
}
