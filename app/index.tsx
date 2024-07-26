import { useTaskActions } from "@/entities/task";
import { AddTask } from "@/features/tasks/add-task";
import { ThemedView } from "@/shared";
import { MainHeader } from "@/widgets/main-header";
import { TaskAddingMenu } from "@/widgets/task-adding-menu";
import { TaskList } from "@/widgets/task-list";
import { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";

export default function Main() {
  const { selectDate } = useTaskActions();

  useLayoutEffect(() => {
    selectDate();
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
