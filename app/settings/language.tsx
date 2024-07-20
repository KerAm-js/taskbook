import { SetLanguage } from "@/features/settings/set-language";
import { Header, PADDING_TOP, ThemedView } from "@/shared";
import { ScrollView, StyleSheet, View } from "react-native";

export default function Language() {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="language" />
      <ScrollView style={styles.scroll}>
        <SetLanguage />
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
});
