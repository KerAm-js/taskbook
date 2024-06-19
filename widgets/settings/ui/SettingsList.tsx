import { bellSvg } from "@/assets/svg/bell";
import { earthSvg } from "@/assets/svg/earth";
import { keyboardSvg } from "@/assets/svg/keyboard";
import { paletteSvg } from "@/assets/svg/palette";
import { Setting, ThemedView } from "@/shared";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

export const SettingsList = () => {
  const [fastMode, setFastMode] = useState(false);

  const onPress = () => setFastMode(!fastMode);

  return (
    <View style={styles.container}>
      <Setting
        type="toggle"
        title="fastInputMode"
        toggleValue={fastMode}
        onPress={onPress}
        xmlGetter={keyboardSvg}
      />
      <Setting
        type="navigate"
        title="settings"
        onPress={() => router.navigate("settings/reminders")}
        xmlGetter={bellSvg}
      />
      <Setting
        type="navigate"
        title="theme"
        onPress={() => router.navigate("settings/theme")}
        xmlGetter={paletteSvg}
      />
      <Setting
        type="navigate"
        title="language"
        onPress={() => router.navigate("settings/language")}
        xmlGetter={earthSvg}
      />
      <ThemedView style={styles.line} colorName="lineGrey" />
      <Setting
        type="navigate"
        title="language"
        onPress={() => router.navigate("settings/language")}
        xmlGetter={earthSvg}
      />
      <Setting
        type="navigate"
        title="language"
        onPress={() => router.navigate("settings/language")}
        xmlGetter={earthSvg}
      />
      <Setting
        type="navigate"
        title="language"
        onPress={() => router.navigate("settings/language")}
        xmlGetter={earthSvg}
      />
      <Setting
        type="navigate"
        title="language"
        onPress={() => router.navigate("settings/language")}
        xmlGetter={earthSvg}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  line: {
    height: 1,
    marginTop: 5,
    marginBottom: 15,
  },
  copyRightContainer: {},
  appName: {},
  authorName: {},
});
