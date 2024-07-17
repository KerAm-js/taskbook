
import { AddTask } from "@/features/tasks/add-task";
import { ThemedView } from "@/shared";
import { MainHeader } from "@/widgets/main-header";
import { TaskAddingMenu } from "@/widgets/task-adding-menu";
import { TaskList } from "@/widgets/task-list";
import { StyleSheet, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export default function Main() {
  const scrollClamp = useSharedValue(0);
  return (
    <ThemedView colorName="background" style={styles.container}>
      <MainHeader scrollClamp={scrollClamp} />
      <TaskList scrollClamp={scrollClamp} />
      <TaskAddingMenu />
      <AddTask />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
