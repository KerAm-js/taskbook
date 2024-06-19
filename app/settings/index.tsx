import { Header, PADDING_TOP, SCREEN_PADDING, ThemedView } from "@/shared";
import { SettingsList } from "@/widgets/settings";
import { ScrollView, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="settings" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <SettingsList />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
  },
});
