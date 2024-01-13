import { CalendarEvents } from './calendar-event.model';

// Helper function to create a Date object with a specific day and time
const createDate = (
  year: number,
  month: number,
  day: number,
  hours: number,
  minutes: number
): Date => {
  return new Date(year, month - 1, day, hours, minutes);
};

// Test data
export const testData: CalendarEvents = {
  tasks: [
    {
      title: 'Task 1',
      date: createDate(2023, 12, 5, 0, 0),
      allDay: true,
      startTime: createDate(2023, 12, 5, 0, 0),
      endTime: createDate(2023, 12, 5, 0, 0),
      description: 'Description for Task 1',
      persons: ['Person A', 'Person B'],
    },
    {
      title: 'Task 2',
      date: createDate(2024, 1, 8, 0, 0),
      allDay: true,
      startTime: createDate(2024, 1, 8, 0, 0),
      endTime: createDate(2024, 1, 8, 0, 0),
      description: 'Description for Task 2',
      persons: ['Person A', 'Person D'],
    },
    {
      title: 'Task 3',
      date: createDate(2024, 2, 3, 0, 0),
      allDay: true,
      startTime: createDate(2024, 2, 3, 0, 0),
      endTime: createDate(2024, 2, 3, 0, 0),
      description: 'Description for Task 3',
      persons: ['Person C', 'Person D'],
    },
    // Add more tasks as needed
  ],
  appointments: [
    {
      title: 'Appointment 1',
      date: createDate(2023, 12, 10, 14, 30),
      allDay: false,
      startTime: createDate(2023, 12, 10, 14, 30),
      endTime: createDate(2023, 12, 10, 16, 0),
      description: 'Description for Appointment 1',
      persons: ['Person C'],
    },
    {
      title: 'Appointment 2',
      date: createDate(2024, 1, 15, 10, 0),
      allDay: false,
      startTime: createDate(2024, 1, 15, 10, 0),
      endTime: createDate(2024, 1, 15, 11, 30),
      description: 'Description for Appointment 2',
      persons: ['Person B', 'Person E'],
    },
    {
      title: 'Appointment 3',
      date: createDate(2024, 2, 20, 15, 0),
      allDay: false,
      startTime: createDate(2024, 2, 20, 15, 0),
      endTime: createDate(2024, 2, 20, 16, 30),
      description: 'Description for Appointment 3',
      persons: ['Person A', 'Person E'],
    },
    // Add more appointments as needed
  ],
};
