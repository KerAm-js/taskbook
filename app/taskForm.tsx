import { useTaskToEdit } from "@/entities/task";
import { Header } from "@/shared";
import { Text, View } from "react-native";

export default function TaskForm() {
  const data = useTaskToEdit();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header modalHeader title="newTask" />
      <Text>Task Form</Text>
    </View>
  )
}