import { Link } from "expo-router";
import { View } from "react-native";

export default function Main() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="history">History</Link>
      <Link href="taskForm">Task form</Link>
      <Link href="settings">Settings</Link>
    </View>
  );
}
