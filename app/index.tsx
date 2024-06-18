import { OpenTaskFormBtn } from "@/features/tasks/open-task-form";
import { ThemedView } from "@/shared";
import { MainHeader } from "@/widgets/main-header";
import { TaskList } from "@/widgets/task-list";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function Main() {
  const scrollClamp = useSharedValue(0);
  return (
    <ThemedView colorName="background" style={styles.container}>
      <MainHeader scrollClamp={scrollClamp} />
      <TaskList scrollClamp={scrollClamp} />
      <OpenTaskFormBtn />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
