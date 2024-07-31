import { TTheme } from "@/shared";

export interface ISettingsState {
  theme: TTheme;
  fastInputMode: boolean;
  reminders: {
    count: number;
    interval: number;
    beginningOfDay: { reminderId?: string; hour?: number; minute?: number, turnedOff?: boolean };
    endOfDay: { reminderId?: string; hour?: number; minute?: number, turnedOff?: boolean };
  };
}