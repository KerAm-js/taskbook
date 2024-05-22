import { Link } from "expo-router";
import { View } from "react-native";

export default function Settings() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="settings/language">Language</Link>
      <Link href="settings/theme">Theme</Link>
      <Link href="settings/reminders">Reminders</Link>
    </View>
  );
}
