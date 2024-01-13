import { CalendarEvent } from './calendar-event.model';

export interface CalendarGrid {
  [key: string]: CalendarGridCell;
}

export interface CalendarGridCell {
  date: Date;
  tasks: CalendarEvent[];
  appointments: CalendarEvent[];
}
