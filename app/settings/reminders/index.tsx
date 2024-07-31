import { useReminderSettings } from "@/entities/settings";
import {
  CustomText,
  getTimeString,
  Header,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  TEXT_STYLES,
  ThemedView,
} from "@/shared";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet } from "react-native";

export default function Reminders() {
  const { t } = useTranslation();
  const { count, interval, beginningOfDay, endOfDay } = useReminderSettings();

  const beginningOfDayStr = beginningOfDay.turnedOff
    ? getTimeString(beginningOfDay)
    : t("off");

  const endOfDayStr = endOfDay.turnedOff ? getTimeString(endOfDay) : t("off");

  const intervalStr = t(interval >= 60 ? "hour" : "min", {
    count: interval >= 60 ? interval / 60 : interval,
  });

  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="reminders" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <CustomText style={styles.title}>tasks</CustomText>
        <Setting
          type="value"
          onPress={() => router.push("settings/reminders/count")}
          value={count}
          title="count"
        />
        <Setting
          type="value"
          onPress={() => router.push("settings/reminders/interval")}
          value={intervalStr}
          disabled={count === 1}
          title="interval"
        />
        <CustomText style={styles.title}>daily</CustomText>
        <Setting
          type="value"
          onPress={() => router.push("settings/reminders/beginningOfDay")}
          value={beginningOfDayStr}
          title="beginningOfDay"
        />
        <CustomText themed colorName="textGrey" style={styles.message}>
          messageBeginningOfDay
        </CustomText>
        <Setting
          type="value"
          onPress={() => router.push("settings/reminders/endOfDay")}
          value={endOfDayStr}
          title="endOfDay"
        />
        <CustomText themed colorName="textGrey" style={styles.message}>
          messageEndOfDay
        </CustomText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP - 15,
    paddingHorizontal: SCREEN_PADDING,
  },
  contentContainer: {
    paddingBottom: 200,
  },
  title: {
    marginVertical: 15,
    ...TEXT_STYLES.title,
  },
  message: {
    ...TEXT_STYLES.small,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
});
