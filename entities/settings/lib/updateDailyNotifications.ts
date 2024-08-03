import { ISettingsState } from "@/entities/settings";
import { setNotification } from "@/shared";

export const updateDailyNotification = ({
  type,
  title,
  body,
  date,
  hour,
  minute,
}: {
  type: keyof ISettingsState["reminders"]["dailyReminder"];

  title: string;
  body: string;
  date: number;
  hour: number;
  minute: number;
}) => {
  const id = `${date}:${type}`;
  const notificationDate = new Date(date).setHours(hour, minute, 0, 0);
  setNotification({
    title,
    body,
    id,
    trigger: {
      date: notificationDate,
    },
  });
};
