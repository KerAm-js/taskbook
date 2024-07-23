import { useTaskActions } from "@/entities/task";
import { AddTask } from "@/features/tasks/add-task";
import { endOfDay, ThemedView } from "@/shared";
import { MainHeader } from "@/widgets/main-header";
import { TaskAddingMenu } from "@/widgets/task-adding-menu";
import { TaskList } from "@/widgets/task-list";
import { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function Main() {
  const { selectDate } = useTaskActions();

  useLayoutEffect(() => {
    selectDate(endOfDay());
  }, []);

  return (
    <ThemedView colorName="background" style={styles.container}>
      <MainHeader />
      <TaskList />
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
