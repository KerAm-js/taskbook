import { TTheme } from "@/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettingsState } from "./types";

const initialState: ISettingsState = {
  theme: "branded",
  fastInputMode: true,
  reminders: {
    count: 3,
    interval: 15,
    dailyReminder: {
      beginning: { hour: 9, minute: 0 },
      end: { hour: 18, minute: 0 },
    },
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload;
    },
    toggleFastInputMode: (state) => {
      state.fastInputMode = !state.fastInputMode;
    },
    setRemindersCount: (state, action: PayloadAction<number>) => {
      state.reminders.count = action.payload;
    },
    setRemindersInterval: (state, action: PayloadAction<number>) => {
      state.reminders.interval = action.payload;
    },
    setDailyReminder: (
      state,
      action: PayloadAction<
        Pick<
          ISettingsState["reminders"]["dailyReminder"]["beginning"],
          "hour" | "minute"
        > & { type: keyof ISettingsState["reminders"]["dailyReminder"] }
      >
    ) => {
      state.reminders.dailyReminder[action.payload.type] = action.payload;
    },
  },
});
