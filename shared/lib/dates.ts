export type TCalendarWeek = {
  days: Array<Date>;
  months: [number, number | undefined];
  year: number;
};

const getWeek = (fDate: Date): TCalendarWeek => {
  const result: TCalendarWeek = {
    days: [],
    months: [0, undefined],
    year: 2024,
  };
  const month = fDate.getMonth();
  result.months[0] = month;

  for (let i = 0; i < 7; i++) {
    const currDate = new Date(
      fDate.getFullYear(),
      fDate.getMonth(),
      fDate.getDate() + i
    );
    const currMonth = currDate.getMonth();
    const currYear = currDate.getFullYear();
    result.days.push(currDate);
    if (currMonth !== month) result.months[1] = currMonth;
    result.year = currYear;
  }
  return result;
};

export const isDatesEqual = (fDate: Date, sDate: Date) => {
  return (
    new Date(fDate.valueOf()).setHours(0, 0, 0, 0) ===
    new Date(sDate.valueOf()).setHours(0, 0, 0, 0)
  );
};

export const isToday = (date: Date) => {
  return (
    new Date(date.valueOf()).setHours(0, 0, 0, 0) ===
    new Date().setHours(0, 0, 0, 0)
  );
};

export const getCalendarWeeks = (
  fDate: Date = new Date(),
  sDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate() + 14
  )
): TCalendarWeek[] => {
  const result: TCalendarWeek[] = [];

  let currDate = fDate;
  const fWeekDay = fDate.getDay() || 7;

  while (currDate <= sDate) {
    const startDate = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() - fWeekDay + 1
    );
    result.push(getWeek(startDate));
    currDate = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      currDate.getDate() + 7
    );
  }

  return result;
};
