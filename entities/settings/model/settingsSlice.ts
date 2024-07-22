import { TTheme } from "@/shared/config/style/colors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ISettingsState {
  theme: TTheme;
  fastInputMode: boolean;
  reminders: {
    count: number;
    interval: number;
    beginningOfDay?: { hours: number; minutes: number };
    endOfDay?: { hours: number; minutes: number };
  };
}

const initialState: ISettingsState = {
  theme: "branded",
  fastInputMode: true,
  reminders: {
    count: 3,
    interval: 15,
    beginningOfDay: {hours: 9, minutes: 0},
    endOfDay: undefined,
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
    setBeginningOfDay: (
      state,
      action: PayloadAction<ISettingsState["reminders"]["beginningOfDay"]>
    ) => {
      state.reminders.beginningOfDay = action.payload;
    },
    setEndOfDay: (
      state,
      action: PayloadAction<ISettingsState["reminders"]["endOfDay"]>
    ) => {
      state.reminders.endOfDay = action.payload;
    },
  },
});
