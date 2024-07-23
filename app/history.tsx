import { Header, ThemedView } from "@/shared";
import { StyleSheet, View } from "react-native";

export default function Main() {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <Header title="history" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
