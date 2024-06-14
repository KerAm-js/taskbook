export const HOURS = Array(24);
export const MINUTES = Array(13).map((_, i) => i * 5);
export const WEEK_DAYS: {
  short: string;
  full: string;
}[] = [
  {
    short: "mo",
    full: "monday",
  },
  {
    short: "tu",
    full: "tuesday",
  },
  {
    short: "we",
    full: "wednesday",
  },
  {
    short: "th",
    full: "thursday",
  },
  {
    short: "fr",
    full: "friday",
  },
  {
    short: "sa",
    full: "saturday",
  },
  {
    short: "su",
    full: "sunday",
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
