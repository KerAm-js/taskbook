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
  const { setEndOfDay } = useSettingsActions();
  const { endOfDay } = useReminderSettings();
  const { t } = useTranslation();

  const data: TDataType = [
    { title: t("off"), value: undefined },
    { title: "12:00", value: { hours: 12, minutes: 0 } },
    { title: "13:00", value: { hours: 13, minutes: 0 } },
    { title: "14:00", value: { hours: 14, minutes: 0 } },
    { title: "15:00", value: { hours: 15, minutes: 0 } },
    { title: "16:00", value: { hours: 16, minutes: 0 } },
    { title: "17:00", value: { hours: 17, minutes: 0 } },
    { title: "18:00", value: { hours: 18, minutes: 0 } },
    { title: "19:00", value: { hours: 19, minutes: 0 } },
    { title: "20:00", value: { hours: 20, minutes: 0 } },
    { title: "21:00", value: { hours: 21, minutes: 0 } },
    { title: "22:00", value: { hours: 22, minutes: 0 } },
    { title: "23:00", value: { hours: 23, minutes: 0 } },
  ];

  const onPress = (value: ISettingsState["reminders"]["endOfDay"]) => {
    setEndOfDay(value);
  };

  return <CheckList selected={endOfDay} data={data} onPress={onPress} />;
};
