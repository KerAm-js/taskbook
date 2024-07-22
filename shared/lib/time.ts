type TProps =
  | {
      hours: number;
      mins: number;
      dateNumber?: undefined;
    }
  | { hours?: number; mins?: number; dateNumber?: number };

export const getTimeString = ({
  hours = 0,
  mins = 0,
  dateNumber,
}: TProps): string => {
  let date;

  if (dateNumber) {
    date = new Date(dateNumber);
  } else {
    date = new Date(new Date().setHours(hours, mins));
  }

  return date.toTimeString().slice(0, 5);
};
