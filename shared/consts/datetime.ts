export const HOURS = Array(24);
export const MINUTES = Array(13).map((_, i) => i * 5);
export const WEEK_DAYS: {
  short: string;
  full: string;
  index: number;
}[] = [
  {
    short: "mo",
    full: "monday",
    index: 1,
  },
  {
    short: "tu",
    full: "tuesday",
    index: 2,
  },
  {
    short: "we",
    full: "wednesday",
    index: 3,
  },
  {
    short: "th",
    full: "thursday",
    index: 4,
  },
  {
    short: "fr",
    full: "friday",
    index: 5,
  },
  {
    short: "sa",
    full: "saturday",
    index: 6,
  },
  {
    short: "su",
    full: "sunday",
    index: 7,
  },
];
export const MONTHS = [
  "january",
  "february",
  "marh",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
