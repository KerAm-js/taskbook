import { deleteNotification, setNotification } from "@/shared";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISettingsState } from "./types";

type TArgument = {
  currReminderId?: string;
  triggerData: ISettingsState["reminders"]["endOfDay"];
  notification: {
    title: string;
    body: string;
  }
};

export const setEndOfDayNotification = createAsyncThunk(
  "settings/reminders/end-of-day",
  async ({
    currReminderId,
    triggerData,
    notification,
  }: TArgument): Promise<ISettingsState["reminders"]["endOfDay"]> => {
    if (currReminderId) {
      deleteNotification(currReminderId);
    }
    if (triggerData.turnedOff) {
      return { turnedOff: true };
    }
    const newId = await setNotification({
      title: notification.title,
      subtitle: '',
      body: notification.body,
      trigger: {
        ...triggerData,
        repeats: true,
      },
    });
    return { ...triggerData, reminderId: newId };
  }
);

export const setBeginningOfDayNotification = createAsyncThunk(
  "settings/reminders/beginning-of-day",
  async ({
    currReminderId,
    triggerData,
    notification,
  }: TArgument): Promise<ISettingsState["reminders"]["beginningOfDay"]> => {
    if (currReminderId) {
      deleteNotification(currReminderId);
    }
    if (triggerData.turnedOff) {
      return { turnedOff: true };
    }
    const newId = await setNotification({
      title: notification.title,
      subtitle: '',
      body: notification.body,
      trigger: {
        ...triggerData,
        repeats: true,
      },
    });
    return { ...triggerData, reminderId: newId };
  }
);
