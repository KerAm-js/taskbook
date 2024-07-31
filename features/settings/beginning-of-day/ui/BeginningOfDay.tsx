import {
  ISettingsState,
  useReminderSettings,
  useSettingsActions,
} from "@/entities/settings";
import { CheckList } from "@/shared";
import { useTranslation } from "react-i18next";

type TDataType = Array<{
  title: string;
  value: ISettingsState["reminders"]["beginningOfDay"];
}>;

export const SetBeginningOfDay = () => {
  const { setBeginningOfDayNotification } = useSettingsActions();
  const { beginningOfDay } = useReminderSettings();
  const { t } = useTranslation();

  const data: TDataType = [
    { title: t("off"), value: { turnedOff: true } },
    { title: "02:00", value: { hour: 2, minute: 0 } },
    { title: "03:00", value: { hour: 3, minute: 0 } },
    { title: "04:00", value: { hour: 4, minute: 0 } },
    { title: "05:00", value: { hour: 5, minute: 0 } },
    { title: "06:00", value: { hour: 6, minute: 0 } },
    { title: "07:00", value: { hour: 7, minute: 0 } },
    { title: "08:00", value: { hour: 8, minute: 0 } },
    { title: "09:00", value: { hour: 9, minute: 0 } },
    { title: "10:00", value: { hour: 10, minute: 0 } },
    { title: "11:57", value: { hour: 11, minute: 57 } },
    { title: "12:00", value: { hour: 12, minute: 0 } },
    { title: "13:00", value: { hour: 13, minute: 0 } },
  ];

  const onPress = (value: ISettingsState["reminders"]["beginningOfDay"]) => {
    setBeginningOfDayNotification({
      currReminderId: beginningOfDay.reminderId,
      triggerData: value,
      notification: {
        title: t('plansForToday'),
        body: t('tasksToDo', {count: 10}),
      }
    });
  };

  const checkMethod = (value: ISettingsState["reminders"]["endOfDay"]) => {
    return (
      value.hour === beginningOfDay.hour &&
      value.minute === beginningOfDay.minute
    );
  };

  return <CheckList checkMethod={checkMethod} data={data} onPress={onPress} />;
};
