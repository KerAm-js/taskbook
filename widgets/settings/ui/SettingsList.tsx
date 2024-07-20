import { bellSvg } from "@/assets/svg/bell";
import { dialogSvg } from "@/assets/svg/dialog";
import { dollarSvg } from "@/assets/svg/dollar";
import { earthSvg } from "@/assets/svg/earth";
import { forwardLeftSvg } from "@/assets/svg/forwardLeft";
import { keyboardSvg } from "@/assets/svg/keyboard";
import { medalSvg } from "@/assets/svg/medal";
import { paletteSvg } from "@/assets/svg/palette";
import appJson from "@/app.json";
import {
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  TEXT_STYLES,
  ThemedText,
  ThemedView,
  useSafeAreaPadding,
} from "@/shared";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useFastInputMode, useSettingsActions } from "@/entities/settings";

export const SettingsList = () => {
  const { toggleFastInputMode } = useSettingsActions();
  const fastInputMode = useFastInputMode();
  const { paddingBottom } = useSafeAreaPadding();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Setting
          type="toggle"
          title="fastInputMode"
          toggleValue={fastInputMode}
          onPress={() => toggleFastInputMode()}
          xmlGetter={keyboardSvg}
        />
        <Setting
          type="navigate"
          title="reminders"
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
        <Setting
          type="navigate"
          title="shareWithFriend"
          onPress={() => {}}
          xmlGetter={forwardLeftSvg}
        />
        <Setting
          type="navigate"
          title="leaveReview"
          onPress={() => {}}
          xmlGetter={medalSvg}
        />
        <Setting
          type="navigate"
          title="contactDeveloper"
          onPress={() => {}}
          xmlGetter={dialogSvg}
        />
        <Setting
          type="navigate"
          title="supportProject"
          onPress={() => {}}
          xmlGetter={dollarSvg}
        />
      </ScrollView>
      <ThemedView
        style={[styles.copyRightContainer, { paddingBottom }]}
        colorName="background"
        borderColorName="lineGrey"
      >
        <ThemedText isTextGrey={true} style={styles.appName}>
          Taskbook {appJson.expo.version}
        </ThemedText>
        <ThemedText isTextGrey={true} style={styles.authorName}>
          Developed by Amir Shishany
        </ThemedText>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
  },
  copyRightContainer: {
    alignItems: "center",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  appName: {
    marginBottom: 5,
    ...TEXT_STYLES.standartBold,
  },
  authorName: {
    ...TEXT_STYLES.small,
  },
});
