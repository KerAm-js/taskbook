import { SetDailyReminder } from "@/features/settings/daily-reminder";
import { Header, PADDING_TOP, ThemedView } from "@/shared";
import { ScrollView, StyleSheet } from "react-native";

export default function Count() {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header modalHeader title="beginningOfDay" />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.contentContainer}
      >
        <SetDailyReminder type="beginning" />
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
    paddingTop: PADDING_TOP,
  },
  contentContainer: {
    paddingBottom: 200,
  },
});
