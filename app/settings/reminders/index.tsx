import { Link } from "expo-router";
import { View } from "react-native";

export default function Reminders() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="settings/reminders/count">Count</Link>
      <Link href="settings/reminders/interval">Interval</Link>
      <Link href="settings/reminders/morningTime">Morning time</Link>
      <Link href="settings/reminders/eveningTime">Evening time</Link>
    </View>
  );
}
