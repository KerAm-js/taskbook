import { logNextTriggerDate, TTheme } from "@/shared";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISettingsState } from "./types";
import {
  setBeginningOfDayNotification,
  setEndOfDayNotification,
} from "./thunks";

const initialState: ISettingsState = {
  theme: "branded",
  fastInputMode: true,
  reminders: {
    count: 3,
    interval: 15,
    beginningOfDay: { hour: 9, minute: 0 },
    endOfDay: { turnedOff: true },
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
      logNextTriggerDate();
      state.reminders.endOfDay = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setEndOfDayNotification.fulfilled, (state, action) => {
      state.reminders.endOfDay = action.payload;
    });
    builder.addCase(
      setBeginningOfDayNotification.fulfilled,
      (state, action) => {
        state.reminders.beginningOfDay = action.payload;
      }
    );
  },
});
