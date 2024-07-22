import {
  ISettingsState,
  useReminderSettings,
  useSettingsActions,
} from "@/entities/settings";
import { CheckList } from "@/shared";

type TDataType = Array<{
  title: string;
  value: ISettingsState["reminders"]["count"];
}>;

export const SetReminderCount = () => {
  const { setRemindersCount } = useSettingsActions();
  const { count } = useReminderSettings();

  const data: TDataType = [
    { title: "1", value: 1 },
    { title: "2", value: 2 },
    { title: "3", value: 3 },
    { title: "4", value: 4 },
    { title: "5", value: 5 },
  ];

  const onPress = (value: ISettingsState["reminders"]["count"]) => {
    setRemindersCount(value);
  };

  return <CheckList selected={count} data={data} onPress={onPress} />;
};
