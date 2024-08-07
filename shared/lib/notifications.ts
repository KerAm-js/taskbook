import * as Notifications from "expo-notifications";

export async function logNextTriggerDate() {
  try {
    const nextTriggerDate = await Notifications.getNextTriggerDateAsync({
      hour: 20,
      minute: 0,
    });
    console.log(
      nextTriggerDate === null
        ? "No next trigger date"
        : new Date(nextTriggerDate).toString()
    );
  } catch (e) {
    console.warn(`Couldn't have calculated next trigger date: ${e}`);
  }
}

async function requestPermissionsAsync() {
  try {
    const settings = await Notifications.getPermissionsAsync();
    if (!settings.granted) {
      const result = await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
        android: {
          allowAlert: true,
          allowBadge: true,
          allowSound: true,
          allowAnnouncements: true,
        },
      });
      if (result.status === "granted") {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log("requestPermissionsAsync", error);
  }
}

export type TSetNotificationArg = {
  title: string;
  body: string;
  date: number | Date;
  id: string | number;
};

export const setNotification = async ({
  title,
  body,
  date,
  id,
}: TSetNotificationArg) => {
  try {
    const isNotifictaionAvailable = await requestPermissionsAsync();
    if (isNotifictaionAvailable) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: "../../assets/notification-sound.wav",
          vibrate: [0, 250, 250, 250],
        },
        trigger: new Date(date),
        identifier: typeof id === "number" ? id.toString() : id,
      });
      return identifier;
    }
  } catch (error) {
    console.log("setNotification", error);
  }
};

export const getAllNotifications = async () => {
  try {
    const result = await Notifications.getAllScheduledNotificationsAsync();
    return result;
  } catch (error) {
    console.log("getAllNotifications", error);
  }
};

export const deleteNotification = async (notificationId: string | number) => {
  try {
    const id =
      typeof notificationId === "number"
        ? notificationId.toString()
        : notificationId;
    await Notifications.cancelScheduledNotificationAsync(id);
  } catch (error) {
    console.log("deleteNotification", error);
  }
};

export const deleteAllNotifications = async () => {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.log("deleteAllNotifications", error);
  }
};