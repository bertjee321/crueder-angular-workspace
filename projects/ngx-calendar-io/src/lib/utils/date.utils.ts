/**
 * Get the full month name for a given date.
 *
 * @param {Date} date - The date for which to get the month name.
 * @param {string} [locale='en'] - The locale to use for formatting.
 * @returns {string} The full month name.
 */
export const getMonthString = (date: Date, locale: string = 'en'): string => {
  return date.toLocaleString(locale, { month: 'long' });
};

/**
 * Get the day of the week (0-6) for the first day of the month.
 *
 * @param {Date} date - The date for which to get the first day of the month.
 * @returns {number} The day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday).
 */
export const getFirstWeekDayNumber = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

/**
 * Get the full weekday name for the first day of the month.
 *
 * @param {Date} date - The date for which to get the first day of the month.
 * @param {string} [locale='en'] - The locale to use for formatting.
 * @returns {string} The full weekday name for the first day of the month.
 */
export const getFirstWeekDayString = (
  date: Date,
  locale: string = 'en'
): string => {
  const month = getMonthString(date);
  const year = date.getFullYear().toString();

  return new Date(`${month} 1, ${year}`).toLocaleString(locale, {
    weekday: 'long',
  });
};

/**
 * Get the number of days in a given month.
 *
 * @param {Date} date - The date for which to get the number of days.
 * @returns {number} The number of days in the month.
 */
export const getNumberOfDaysInMonth = (date: Date): number => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();

  return daysInMonth;
};

/**
 * Get a new Date object for a specific day in the same month and year as the given date.
 *
 * @param {number} day - The day of the month.
 * @param {Date} date - The date to extract the month and year from.
 * @returns {Date} A new Date object for the specified day in the same month and year.
 */
export const getExactDate = (day: number, date: Date): Date => {
  const year = date.getFullYear();
  const month = date.getMonth();

  return new Date(year, month, day);
};

/**
 * Add one month to the given date, handling year changes if necessary.
 *
 * @param {Date} date - The date to which to add a month.
 * @returns {Date} A new Date object representing the result of adding one month.
 */
export const addMonth = (date: Date): Date => {
  const newDate = new Date(date);

  newDate.setMonth(date.getMonth() + 1);

  if (newDate.getMonth() !== (date.getMonth() + 1) % 12) {
    newDate.setFullYear(date.getFullYear() + 1);
  }

  return newDate;
};

/**
 * Subtract one month from the given date, handling year changes if necessary.
 *
 * @param {Date} date - The date from which to subtract a month.
 * @returns {Date} A new Date object representing the result of subtracting one month.
 */
export const subtractMonth = (date: Date): Date => {
  const newDate = new Date(date);

  newDate.setMonth(date.getMonth() - 1);

  if (newDate.getMonth() !== (date.getMonth() - 1 + 12) % 12) {
    newDate.setFullYear(date.getFullYear() - 1);
  }

  return newDate;
};

/**
 * Compares whether two dates represent the same day.
 *
 * @param dateOne - The first date to compare.
 * @param dateTwo - The second date to compare.
 * @returns `true` if the dates represent the same day, otherwise `false`.
 */
export const compareDatesAreSameDay = (
  dateOne: Date,
  dateTwo: Date
): boolean => {
  const dateOneTimeStamp = new Date(
    dateOne.getFullYear(),
    dateOne.getMonth(),
    dateOne.getDate()
  ).getTime();
  const dateTwoTimeStamp = new Date(
    dateTwo.getFullYear(),
    dateTwo.getMonth(),
    dateTwo.getDate()
  ).getTime();

  return dateOneTimeStamp === dateTwoTimeStamp;
};
