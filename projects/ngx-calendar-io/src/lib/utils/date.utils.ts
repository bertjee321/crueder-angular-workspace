export const getMonthString = (date: Date, locale: string): string => {
  return date.toLocaleString(locale, { month: 'long' });
};

export const getFirstWeekDayString = (date: Date, locale: string): string => {
  const month = getMonthString(date, 'en');
  const year = date.getFullYear().toString();

  return new Date(`${month} 1, ${year}`).toLocaleString(locale, {
    weekday: 'long',
  });
};

export const getNumberOfDaysInMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  return daysInMonth;
};

export const getExactDate = (day: number, date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month, day);
};
