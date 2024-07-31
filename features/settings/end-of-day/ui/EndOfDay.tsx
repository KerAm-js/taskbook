import {
  ISettingsState,
  useReminderSettings,
  useSettingsActions,
} from "@/entities/settings";
import { CheckList } from "@/shared";
import { useTranslation } from "react-i18next";

type TDataType = Array<{
  title: string;
  value: ISettingsState["reminders"]["endOfDay"];
}>;

export const SetEndOfDay = () => {
  const { setEndOfDayNotification } = useSettingsActions();
  const { endOfDay } = useReminderSettings();
  const { t } = useTranslation();

  const data: TDataType = [
    { title: t("off"), value: { turnedOff: true } },
    { title: "12:00", value: { hour: 12, minute: 0 } },
    { title: "13:00", value: { hour: 13, minute: 0 } },
    { title: "14:00", value: { hour: 14, minute: 0 } },
    { title: "15:00", value: { hour: 15, minute: 0 } },
    { title: "16:00", value: { hour: 16, minute: 0 } },
    { title: "17:00", value: { hour: 17, minute: 0 } },
    { title: "18:00", value: { hour: 18, minute: 0 } },
    { title: "19:00", value: { hour: 19, minute: 0 } },
    { title: "20:00", value: { hour: 20, minute: 0 } },
    { title: "21:00", value: { hour: 21, minute: 0 } },
    { title: "22:00", value: { hour: 22, minute: 0 } },
    { title: "23:00", value: { hour: 23, minute: 0 } },
  ];

  const onPress = (value: ISettingsState["reminders"]["endOfDay"]) => {
    setEndOfDayNotification({
      currReminderId: endOfDay.reminderId,
      triggerData: value,
      notification: {
        title: t(""),
        body: t(""),
      },
    });
  };

  const checkMethod = (value: ISettingsState["reminders"]["endOfDay"]) => {
    return value.hour === endOfDay.hour && value.minute === endOfDay.minute;
  };

  return <CheckList checkMethod={checkMethod} data={data} onPress={onPress} />;
};
