import { DATE_MONTHS, WEEK_DAYS } from "@/shared/consts/datetime";
import { TFunction } from "i18next";
export type TCalendarWeek = {
  days: Array<number>;
  months: [number, number | undefined];
  year: number;
};

export const endOfDay = (date?: number | Date) => {
  return date
    ? typeof date === "number"
      ? new Date(date).setHours(23, 59, 59, 999)
      : new Date(date.valueOf()).setHours(23, 59, 59, 999)
    : new Date().setHours(23, 59, 59, 999);
};

export const isDatesEqual = (fDate: number | Date, sDate: number | Date) => {
  return endOfDay(fDate) === endOfDay(sDate);
};

export const isYesterday = (date: number) => {
  return new Date().setHours(0, 0, 0, 0) - 1 === endOfDay(date);
};

export const isToday = (date: number | Date) => {
  return endOfDay(date) === endOfDay();
};

export const isTomorrow = (date: number) => {
  return new Date(date).setHours(0, 0, 0, 0) === endOfDay() + 1;
};

export const isCurrentYear = (date: number) => {
  return getYear(date) === new Date().getFullYear();
};

export const getDate = (date: number) => {
  return new Date(date).getDate();
};

export const getWeekDay = (date: number) => {
  return new Date(date).getDay();
};

export const getMonth = (date: number) => {
  return new Date(date).getMonth();
};

export const getYear = (date: number) => {
  return new Date(date).getFullYear();
};

export const getNextDate = (date: number) => {
  return endOfDay(date) + 1;
};

export const getDateTitle = (
  date: number,
  t: TFunction<"translation", undefined>
) => {
  if (isYesterday(date)) {
    return t("yesterday");
  } else if (isToday(date)) {
    return t("today");
  } else if (isTomorrow(date)) {
    return t("tomorrow");
  } else if (date < getDateLater(7, endOfDay()).valueOf()) {
    return t([WEEK_DAYS[6], ...WEEK_DAYS][getWeekDay(date)].full);
  } else {
    return (
      getDate(date) +
      " " +
      t(DATE_MONTHS[getMonth(date)]) +
      (!isCurrentYear(date) ? " " + getYear(date) : "")
    );
  }
};

export const getDateLater = (daysCount: number = 1, startDate?: number) => {
  const date = startDate ? new Date(startDate) : new Date();
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + daysCount
  );
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
    result.days.push(endOfDay(currDate));
    if (currMonth !== month) result.months[1] = currMonth;
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
