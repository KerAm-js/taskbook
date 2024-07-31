type TProps =
  | {
      hour?: number;
      minute?: number;
      dateNumber?: undefined;
    }
  | { hour?: undefined; minute?: undefined; dateNumber?: number };

export const getTimeString = ({
  hour,
  minute,
  dateNumber,
}: TProps): string => {
  let date;

  if (dateNumber) {
    date = new Date(dateNumber);
  } else if (hour !== undefined && minute !== undefined ) {
    date = new Date(new Date().setHours(hour, minute));
  } else {
    return '';
  }

  return date.toTimeString().slice(0, 5);
};
