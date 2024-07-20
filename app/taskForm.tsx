import { useTaskToEdit } from "@/entities/task";
import { Text, View } from "react-native";

export default function TaskForm() {
  const data = useTaskToEdit();
  console.log(data);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Task Form</Text>
    </View>
  )
}