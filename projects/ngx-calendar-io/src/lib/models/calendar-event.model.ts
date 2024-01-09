import { CalendarEventType } from "../enums";

export interface Event {
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  type: CalendarEventType;
  title: string;
  description?: string;
  persons?: string[];
}
