export interface CalendarEvents {
  tasks: CalendarEvent[];
  appointments: CalendarEvent[];
}

export interface CalendarEvent {
  title: string;
  date: Date;
  allDay: boolean;
  startTime: Date;
  endTime: Date;
  description?: string;
  persons?: string[];
}
