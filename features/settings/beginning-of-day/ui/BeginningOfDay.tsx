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
  const { setBeginningOfDay } = useSettingsActions();
  const { beginningOfDay } = useReminderSettings();
  const { t } = useTranslation();

  const data: TDataType = [
    { title: t("off"), value: undefined },
    { title: "02:00", value: { hours: 2, minutes: 0 } },
    { title: "03:00", value: { hours: 3, minutes: 0 } },
    { title: "04:00", value: { hours: 4, minutes: 0 } },
    { title: "05:00", value: { hours: 5, minutes: 0 } },
    { title: "06:00", value: { hours: 6, minutes: 0 } },
    { title: "07:00", value: { hours: 7, minutes: 0 } },
    { title: "08:00", value: { hours: 8, minutes: 0 } },
    { title: "09:00", value: { hours: 9, minutes: 0 } },
    { title: "10:00", value: { hours: 10, minutes: 0 } },
    { title: "11:00", value: { hours: 11, minutes: 0 } },
    { title: "12:00", value: { hours: 12, minutes: 0 } },
    { title: "13:00", value: { hours: 13, minutes: 0 } },
  ];

  const onPress = (value: ISettingsState["reminders"]["beginningOfDay"]) => {
    setBeginningOfDay(value);
  };

  return <CheckList selected={beginningOfDay} data={data} onPress={onPress} />;
};
