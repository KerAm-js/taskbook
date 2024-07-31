import { bindActionCreators } from "@reduxjs/toolkit";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingsSlice } from "./settingsSlice";
import { RootState } from "@/appLayer/store";
import {
  setBeginningOfDayNotification,
  setEndOfDayNotification,
} from "./thunks";

const actions = {
  setEndOfDayNotification,
  setBeginningOfDayNotification,
  ...settingsSlice.actions,
};

export const useSettingsActions = () => {
  const dispatch = useDispatch();
  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};

export const useSettings = () => {
  const settings = useSelector((state: RootState) => state.settings);
  return settings;
};

export const useFastInputMode = () => {
  const mode = useSelector((state: RootState) => state.settings.fastInputMode);
  return mode;
};

export const useReminderSettings = () => {
  const reminders = useSelector((state: RootState) => state.settings.reminders);
  return reminders;
};
