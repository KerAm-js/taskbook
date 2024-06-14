type TDayType = {
  date: Date;
  isCurrentMonth: boolean;
};

type TCalendarMonthItemType = Array<Array<TDayType>>;

export type TCalendarWeek = {
  days: Array<Date>;
  months: [number, number | undefined];
  year: number;
};

const getWeek = (fDate: Date): TCalendarWeek => {
  const result: TCalendarWeek = { days: [], months: [0, undefined], year: 2024 };
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
    if (currMonth !== month) result.months[1] = currMonth
    result.year = currYear;
  }
  return result;
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

export const getMonthCalendarArray = (
  month: number,
  year: number
): TCalendarMonthItemType => {
  const result: TCalendarMonthItemType = [[], [], [], [], [], []];
  const firstWeekDayOfMonth = new Date(year, month, 1).getDay() || 7;
  let isCurrentMonth = false;

  for (let i = 0; i < 42; i++) {
    const line = Math.round(i / 7);
    const date = new Date(year, month, i - firstWeekDayOfMonth + 2);

    if (line === 0 && date.getDate() === 1) isCurrentMonth = true;
    else if (line > 0 && date.getDate() === 1) isCurrentMonth = false;

    result[line][i - line * 7] = {
      date,
      isCurrentMonth,
    };
  }

  return result;
};

export const getCalendarArray = (
  fromDate: Date,
  monthsCount: number
): Array<TCalendarMonthItemType> => {
  const result: Array<TCalendarMonthItemType> = [];

  if (monthsCount < 0) {
    return [];
  }

  for (
    let i = fromDate.getMonth();
    i <= fromDate.getMonth() + monthsCount;
    i++
  ) {
    result.push(getMonthCalendarArray(i, fromDate.getFullYear()));
  }

  return result;
};
