import { TTheme } from "@/shared";

export type TDailyNotificationIds = {
  [key: string]: string;
};

export type TDailyNotificationData = {
  hour: number;
  minute: number;
  turnedOff?: boolean;
};

export interface ISettingsState {
  theme: TTheme;
  fastInputMode: boolean;
  reminders: {
    count: number;
    interval: number;
    dailyReminder: {
      beginning: TDailyNotificationData,
      end: TDailyNotificationData,
    }
  };
}
