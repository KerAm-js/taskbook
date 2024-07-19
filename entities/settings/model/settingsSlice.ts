import { TTheme } from "@/shared/config/style/colors";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ISettingsState {
  theme: TTheme;
  reminders: {
    count: number;
    interval: number;
    beginningOfDay: number;
    endOfDay: number;
  };
}

const initialState: ISettingsState = {
  theme: "branded",
  reminders: {
    count: 1,
    interval: 0,
    beginningOfDay: 0,
    endOfDay: 0,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<TTheme>) => {
      state.theme = action.payload;
    },
    setRemindersCount: (state, action: PayloadAction<number>) => {
      state.reminders.count = action.payload;
    },
    setRemindersInterval: (state, action: PayloadAction<number>) => {
      state.reminders.interval = action.payload;
    },
    setBeginningOfDay: (state, action: PayloadAction<number>) => {
      state.reminders.beginningOfDay = action.payload;
    },
    setEndOfDat: (state, action: PayloadAction<number>) => {
      state.reminders.endOfDay = action.payload;
    },
  },
});
