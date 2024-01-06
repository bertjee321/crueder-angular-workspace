export interface MonthCalendarGrid {
    [key: string]: {
      date: Date | undefined;
      events: { title: string; time?: string }[];
    };
  }
  